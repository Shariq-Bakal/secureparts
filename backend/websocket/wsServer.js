import { WebSocketServer, WebSocket } from "ws";

/**
 * Admin sockets (unique connections)
 */
const adminClients = new Set();

/**
 * Vendor sockets map:
 * vendorId -> WebSocket connection
 */
const vendors = new Map();

/**
 * Initialize WebSocket server
 */
export const initWebsocket = (server) => {
    const wss = new WebSocketServer({ server });

    /**
     * HEARTBEAT SYSTEM
     * Detects dead connections safely
     */
    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {

            // If client didn't respond to ping → consider dead
            if (ws.isAlive === false) {

                console.log("Dead socket detected:", ws.role, ws.userId);

                // SAFE vendor cleanup (only if same socket)
                if (ws.role === "vendor" && ws.userId) {
                    const current = vendors.get(ws.userId);
                    if (current === ws) {
                        vendors.delete(ws.userId);
                    }
                }

                // SAFE admin cleanup
                if (ws.role === "admin") {
                    adminClients.delete(ws);
                }

                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);

    /**
     * New connection handler
     */
    wss.on("connection", (ws) => {
        console.log("Socket connected");

        ws.isAlive = true;
        ws.role = null;
        ws.userId = null;

        /**
         * Mark socket alive on pong
         */
        ws.on("pong", () => {
            ws.isAlive = true;
        });

        /**
         * Incoming messages
         */
        ws.on("message", (message) => {
            try {
                const data = JSON.parse(message.toString());

                if (!data.role) {
                    console.log("Invalid message (no role)");
                    return;
                }

                /**
                 * ================= ADMIN =================
                 */
                if (data.role === "admin") {
                    ws.role = "admin";
                    adminClients.add(ws);

                    console.log("Admin registered");
                }

                /**
                 * ================= VENDOR =================
                 */
                console.log(data.userId,"VENDOR ID")
                if (data.role === "vendor" && data.userId) {
                    ws.role = "vendor";
                    ws.userId = data.userId;

                    console.log("Registering vendor:", data.userId);

                    const existing = vendors.get(data.userId);

                    /**
                     * If old socket exists → close it safely
                     */
                    if (existing && existing !== ws) {
                        console.log("Closing old vendor socket");
                        existing.terminate();
                    }

                    vendors.set(data.userId, ws);

                    console.log("Vendor registered successfully");
                    console.log("Current vendor count:", vendors.size);
                }

            } catch (err) {
                console.log("Invalid JSON:", err.message);
            }
        });

        /**
         * On disconnect
         */
        ws.on("close", () => {
            console.log("Socket disconnected:", ws.role, ws.userId);

            /**
             * SAFE vendor cleanup
             * Only remove if same socket instance
             */
            if (ws.role === "vendor" && ws.userId) {
                const current = vendors.get(ws.userId);
                if (current === ws) {
                    vendors.delete(ws.userId);
                }
            }

            /**
             * Remove admin safely
             */
            if (ws.role === "admin") {
                adminClients.delete(ws);
            }
        });

        /**
         * Error handler
         */
        ws.on("error", (error) => {
            console.log("WS Error:", error.message);
        });
    });

    /**
     * Stop heartbeat on server close
     */
    wss.on("close", () => {
        clearInterval(interval);
    });

    return wss;
};

/**
 * ================= ADMIN BROADCAST =================
 */
export const notifyAdmin = (payload) => {
    for (const admin of adminClients) {
        try {
            if (admin.readyState === WebSocket.OPEN) {
                admin.send(JSON.stringify(payload));
            } else {
                adminClients.delete(admin);
            }
        } catch (error) {
            console.log("Admin notify error:", error);
            adminClients.delete(admin);
        }
    }
};

/**
 * ================= VENDOR NOTIFICATION =================
 */
export const notifyVendor = (vendorId, payload) => {
    const vendorSocket = vendors.get(vendorId);
    console.log(vendors)

    console.log("Notify vendorId:", vendorId);
    console.log("Vendor exists:", !!vendorSocket);

    try {
        if (vendorSocket && vendorSocket.readyState === WebSocket.OPEN) {
            vendorSocket.send(JSON.stringify(payload));
            console.log("Message sent to vendor");
        } else {
            console.log("Vendor not connected");

            vendors.delete(vendorId);
        }
    } catch (error) {
        console.log("Vendor notify error:", error);

        vendors.delete(vendorId);
    }
};