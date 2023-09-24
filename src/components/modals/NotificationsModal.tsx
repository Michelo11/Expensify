import { useFetcher } from "@/utils/fetcher";
import type { Notification } from "@prisma/client";

export default function NotificationsModal({
  notifications,
}: {
  notifications?: Notification[];
}) {
  return (
    <dialog
      id="modal_notifications"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box bg-modal flex flex-col gap-4">
        <h3 className="font-bold text-lg">Notifications</h3>
        {notifications && notifications.length > 0 ? (
          <ul className="list-none">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className="bg-[#222222] m-2 p-2 rounded"
              >
                {notification.message}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications</p>
        )}
        <form method="dialog">
          <div className="modal-action">
            {(notifications && notifications.length > 0 && (
              <button
                className="btn btn-primary"
                onClick={async () => {
                  await fetch("/api/notifications/clear", {
                    method: "DELETE",
                  });
                  window.location.reload();
                }}
              >
                Clear
              </button>
            )) || (
              <button className="btn btn-primary" disabled>
                Clear
              </button>
            )}
            <button className="btn">Close</button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
