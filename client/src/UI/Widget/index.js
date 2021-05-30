const Widget = (props) => {
  return (
    <div id={props.id} className={props.className}>
      <div className="widget box box-shadow">
        <div className="widget-content widget-content-area">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Widget;
