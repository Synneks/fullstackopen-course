const Notification = ({ error }) => {
  if (!(error || error.message || error.type)) {
    return null;
  }

  return <div className={error.type}>{error.message}</div>;
};

export default Notification;
