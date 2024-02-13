/* eslint-disable react/prop-types */
export const EventsList = ({ appEvents }) => {
  return appEvents.length === 0 ? (
    <div className="event">No events yet</div>
  ) : (
    <div className="events-list">
      {appEvents.map((appEvent) => {
        return <Event key={appEvent?.hookEvent} appEvent={appEvent} />;
      })}
      <Event />
    </div>
  );
};
const Event = ({ appEvent }) => {
  if (!appEvent?.hookEvent) return;
  return (
    <div className="event">
      <span>{appEvent?.createdAt}</span>
      <h4>%</h4>
      <h4>{appEvent?.hookEvent}</h4>
    </div>
  );
};
export default EventsList;
