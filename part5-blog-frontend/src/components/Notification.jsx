const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <div className={notification.error ? 'error' : 'notification'}>
      {notification.message}
    </div>
  );
};

export default Notification;
