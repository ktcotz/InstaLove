import { z } from "zod";

export const NotificationSchema = z.object({
  created_at: z.string().optional(),
  user_id: z.string(),
  by_user: z.string(),
  status: z.enum(["read", "unread"]),
  type: z.enum(["like", "observe", "bookmark", "comment"]),
});

export const NotificationsSchema = z.array(
  z.intersection(
    z.object({
      id: z.number(),
      created_at: z.string(),
    }),
    NotificationSchema
  )
);

export type Notification = z.infer<typeof NotificationSchema>;
export type Notifications = z.infer<typeof NotificationsSchema>;
