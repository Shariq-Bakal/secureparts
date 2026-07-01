import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";

/**
 * Initialize WebSocket server
 */

const adminClients = new Set();
const vendors = new Map();

export const initWebsocket = (server) => {
    const wss = new WebSocketServer({ server });

    const interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (ws.isAlive === false) {
                console.log("Dead socket detected:", ws.role, ws.userId);

                if (ws.role === "vendor" && ws.userId) {
                    const current = vendors.get(ws.userId);
                    if (current === ws) {
                        vendors.delete(ws.userId);
                    }
                }

                if (ws.role === "admin") {
                    adminClients.delete(ws);
                }

                return ws.terminate();
            }

            ws.isAlive = false;
            ws.ping();
        });
    }, 30000);

    // IMPORTANT: add req here
    wss.on("connection", (ws, req) => {
        console.log("Socket connected");

        ws.isAlive = true;
        ws.role = null;
        ws.userId = null;

        try {
            const url = new URL(req.url, "http://localhost");
            const token = url.searchParams.get("token");

            if (!token) {
                console.log("No token provided");
                ws.close();
                return;
            }

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // store decoded user
            ws.user = decoded;

            // ONLY admins can become admin clients
            if (decoded.role === "admin") {
                ws.role = "admin";
                adminClients.add(ws);
                console.log("Admin authenticated");
            }

        } catch (err) {
            console.log("Invalid token");
            ws.close();
            return;
        }

        ws.on("pong", () => {
            ws.isAlive = true;
        });

        ws.on("message", (message) => {
            try {
                const data = JSON.parse(message.toString());

                // Only vendors register via message
                if (data.role === "vendor" && data.userId) {
                    ws.role = "vendor";
                    ws.userId = data.userId;

                    console.log("Registering vendor:", data.userId);

                    const existing = vendors.get(data.userId);

                    if (existing && existing !== ws) {
                        existing.terminate();
                    }

                    vendors.set(data.userId, ws);

                    console.log("Vendor registered successfully");
                }

            } catch (err) {
                console.log("Invalid JSON:", err.message);
            }
        });

        ws.on("close", () => {
            console.log("Socket disconnected:", ws.role, ws.userId);

            if (ws.role === "vendor" && ws.userId) {
                const current = vendors.get(ws.userId);
                if (current === ws) {
                    vendors.delete(ws.userId);
                }
            }

            if (ws.role === "admin") {
                adminClients.delete(ws);
            }
        });

        ws.on("error", (error) => {
            console.log("WS Error:", error.message);
        });
    });

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