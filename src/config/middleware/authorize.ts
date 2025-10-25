import { Request, Response, NextFunction } from "express";

const authorize =
  (...allowedRoles: string[]) =>
  (req: any, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      // Changed from req.user.role to req.user.type
      if (!allowedRoles.includes(req.user.type)) {
        return res.status(403).json({
          message: `Access denied: ${req.user.type} not allowed`,
          allowedRoles,
        });
      }

      next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(500).json({ message: "Authorization failed", error: err.message });
      }
      return res.status(500).json({ message: "Authorization failed", error: String(err) });
    }
  };

export default authorize;