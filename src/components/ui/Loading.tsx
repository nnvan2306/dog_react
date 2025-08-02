const Loading = () => {
    return (
        <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
                background: "rgba(255,255,255,0.85)",
                zIndex: 10,
            }}
        >
            <div className="text-center">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                >
                    <span className="visually-hidden">Đang tải...</span>
                </div>
                <h5 className="text-muted">
                    Đang tải thông tin các giống chó...
                </h5>
            </div>
        </div>
    );
};

export default Loading;
