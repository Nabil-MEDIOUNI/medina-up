import React from 'react';

const OfflineContainer = () => {
  function dismiss() {
    const offline_bg = document.getElementById('offline_bg');
    const offline_retry = document.getElementById('offline_retry');
    const offline_container = document.getElementById('offline_container');
    const dashboard_container = document.getElementById('dashboard_container');

    offline_retry.style.display = 'none';
    offline_bg.style.filter = 'blur(0px)';

    offline_container.style.display = 'none';
    dashboard_container.style.display = 'block';
  }

  function retry() {
    window.location.reload();
  }

  return (
    <>
      <div
        style={{
          display: 'none',
          position: 'absolute',
          zIndex: 99999999,
          width: '100%',
          height: '100%',
          background: 'white',
        }}
        id="offline_container"
      >
        <div className="offline_bg" id="offline_bg">
          <div className="subname">
            <h5 className="loader_subname">MEDINA UP</h5>
          </div>
        </div>
        <div className="offline_retry" id="offline_retry">
          <p className="offline_typo">No Internet connection</p>
          <div className="offline_btns_container">
            <button type="button" onClick={retry} className="offline_btns">
              RETRY
            </button>
            <button
              type="button"
              style={{ margin: 0 }}
              onClick={dismiss}
              className="offline_btns"
            >
              DISMISS
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OfflineContainer;
