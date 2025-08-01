/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../libs/axios";
import { setDogs } from "../../store/dogSlice";
import type { RootState } from "../../store/store";
import type { DogType } from "../../types/dog";
import type { ResponseType } from "../../types";

interface PaginationMeta {
    current: number;
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    records: number;
}

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state: RootState) => state.dog.dogs);
    const [pagination, setPagination] = useState<PaginationMeta>({
        current: 1,
        first: 1,
        prev: null,
        next: null,
        last: 1,
        records: 0,
    });
    const [loading, setLoading] = useState(false);
    console.log("pagination:", pagination);
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css";
        document.head.appendChild(link);

        return () => {
            if (document.head.contains(link)) {
                document.head.removeChild(link);
            }
        };
    }, []);

    const fetchDogs = async (page: number = 1) => {
        setLoading(true);
        try {
            const res = await api.get<ResponseType<DogType>>(
                `/breeds?page[number]=${page}`
            );
            if (res?.data?.meta?.pagination) {
                const paginationData = res?.data?.meta?.pagination;

                setPagination({
                    current: paginationData?.current || pagination.current,
                    first: paginationData?.first || pagination.first,
                    prev: paginationData?.prev || pagination.prev,
                    next: paginationData?.next || pagination.next,
                    last: paginationData?.last || pagination.last,
                    records: paginationData?.records || pagination.records,
                });
            }
            dispatch(setDogs(res.data.data));
        } catch (error) {
            console.error("Failed to fetch dogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDogs(1);
    }, []);

    const handlePageChange = useCallback(
        (page: number) => {
            console.log("Changing to page:", page, pagination);
            if (page >= 1 && page <= pagination.last) {
                fetchDogs(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        },
        [pagination.last]
    );

    const renderPageNumbers = () => {
        const pages = [];
        const current = pagination.current;
        const last = pagination.last;

        // Always show first page
        if (current > 3) {
            pages.push(1);
            if (current > 4) {
                pages.push("...");
            }
        }

        // Show pages around current page
        for (
            let i = Math.max(1, current - 2);
            i <= Math.min(last, current + 2);
            i++
        ) {
            pages.push(i);
        }

        // Always show last page
        if (current < last - 2) {
            if (current < last - 3) {
                pages.push("...");
            }
            pages.push(last);
        }

        return pages;
    };

    return (
        <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Hero Section */}
            <div
                className="bg-gradient-primary text-white py-5 mb-5"
                style={{
                    background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold mb-3">
                                <i className="bi bi-heart-fill text-danger me-3"></i>
                                Thế Giới Các Giống Chó
                            </h1>
                            <p className="lead mb-4">
                                Khám phá và tìm hiểu về{" "}
                                <strong>{pagination.records}</strong> giống chó
                                khác nhau từ khắp nơi trên thế giới
                            </p>
                            <div className="d-flex justify-content-center gap-4 text-white-50">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-shield-check me-2"></i>
                                    <span>Thông tin chính xác</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-heart me-2"></i>
                                    <span>Được yêu thích</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-star-fill me-2"></i>
                                    <span>Chất lượng cao</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container pb-5">
                {loading ? (
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div className="text-center py-5">
                                <div
                                    className="spinner-border text-primary mb-3"
                                    role="status"
                                    style={{ width: "3rem", height: "3rem" }}
                                >
                                    <span className="visually-hidden">
                                        Đang tải...
                                    </span>
                                </div>
                                <h5 className="text-muted">
                                    Đang tải thông tin các giống chó...
                                </h5>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Dog Cards Grid */}
                        <div className="row g-4 mb-5">
                            {dogs.map((dog: DogType) => (
                                <div className="col-lg-4 col-md-6" key={dog.id}>
                                    <div
                                        className="card border-0 shadow-sm h-100 hover-lift"
                                        style={{
                                            transition: "all 0.3s ease",
                                            cursor: "pointer",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(-8px)";
                                            e.currentTarget.style.boxShadow =
                                                "0 0.5rem 1rem rgba(0, 0, 0, 0.15)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform =
                                                "translateY(0)";
                                            e.currentTarget.style.boxShadow =
                                                "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
                                        }}
                                    >
                                        {/* Card Header */}
                                        <div className="card-header border-0 bg-white pb-2">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h5 className="card-title mb-0 text-primary fw-bold">
                                                    <i className="bi bi-award me-2"></i>
                                                    {dog.attributes.name}
                                                </h5>
                                                <span
                                                    className={`badge ${
                                                        dog.attributes
                                                            .hypoallergenic
                                                            ? "bg-success"
                                                            : "bg-secondary"
                                                    } rounded-pill`}
                                                >
                                                    {dog.attributes
                                                        .hypoallergenic ? (
                                                        <>
                                                            <i className="bi bi-check-circle me-1"></i>
                                                            Hypoallergenic
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-x-circle me-1"></i>
                                                            Regular
                                                        </>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Body */}
                                        <div className="card-body pt-0">
                                            <p
                                                className="text-muted mb-4"
                                                style={{
                                                    lineHeight: "1.6",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                {dog.attributes.description}
                                            </p>

                                            {/* Stats Cards */}
                                            <div className="row g-2 mb-3">
                                                <div className="col-6">
                                                    <div className="bg-light rounded p-3 text-center">
                                                        <i className="bi bi-clock text-info mb-2 d-block fs-5"></i>
                                                        <div className="fw-bold text-dark">
                                                            {
                                                                dog.attributes
                                                                    .life.min
                                                            }
                                                            -
                                                            {
                                                                dog.attributes
                                                                    .life.max
                                                            }
                                                        </div>
                                                        <small className="text-muted">
                                                            năm tuổi thọ
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="bg-light rounded p-3 text-center">
                                                        <i className="bi bi-tags text-warning mb-2 d-block fs-5"></i>
                                                        <div className="fw-bold text-dark text-capitalize">
                                                            {dog.type}
                                                        </div>
                                                        <small className="text-muted">
                                                            nhóm
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Weight Information */}
                                            <div className="bg-primary bg-opacity-10 rounded p-3">
                                                <h6 className="text-primary mb-2">
                                                    <i className="bi bi-speedometer2 me-2"></i>
                                                    Thông tin trọng lượng
                                                </h6>
                                                <div className="row g-2">
                                                    <div className="col-6">
                                                        <div>
                                                            <div className="fw-bold">
                                                                {
                                                                    dog
                                                                        .attributes
                                                                        .male_weight
                                                                        .min
                                                                }
                                                                -
                                                                {
                                                                    dog
                                                                        .attributes
                                                                        .male_weight
                                                                        .max
                                                                }{" "}
                                                                kg
                                                            </div>
                                                            <div className="">
                                                                <i className="bi bi-gender-male text-primary me-2"></i>
                                                                <small className="text-muted">
                                                                    Đực
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div>
                                                            <div className="fw-bold">
                                                                {
                                                                    dog
                                                                        .attributes
                                                                        .female_weight
                                                                        .min
                                                                }
                                                                -
                                                                {
                                                                    dog
                                                                        .attributes
                                                                        .female_weight
                                                                        .max
                                                                }{" "}
                                                                kg
                                                            </div>
                                                            <div className="">
                                                                <i className="bi bi-gender-female text-danger me-2"></i>
                                                                <small className="text-muted">
                                                                    Cái
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enhanced Pagination */}
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body py-4">
                                        <nav aria-label="Điều hướng trang">
                                            <ul className="pagination pagination-lg mb-0">
                                                <li
                                                    className={`page-item ${
                                                        pagination.current === 1
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link border-0 rounded-3 me-2"
                                                        onClick={() =>
                                                            handlePageChange(1)
                                                        }
                                                        disabled={
                                                            pagination.current ===
                                                            1
                                                        }
                                                        title="Trang đầu tiên"
                                                    >
                                                        <i className="bi bi-chevron-double-left"></i>
                                                    </button>
                                                </li>

                                                <li
                                                    className={`page-item ${
                                                        !pagination.prev
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link border-0 rounded-3 me-2"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pagination.current -
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            !pagination.prev
                                                        }
                                                        title="Trang trước"
                                                    >
                                                        <i className="bi bi-chevron-left"></i>
                                                    </button>
                                                </li>

                                                {renderPageNumbers().map(
                                                    (page, index) => (
                                                        <li
                                                            key={index}
                                                            className={`page-item ${
                                                                page ===
                                                                pagination.current
                                                                    ? "active"
                                                                    : ""
                                                            } ${
                                                                page === "..."
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <button
                                                                className={`page-link border-0 rounded-3 me-2 ${
                                                                    page ===
                                                                    pagination.current
                                                                        ? "bg-primary text-white"
                                                                        : ""
                                                                }`}
                                                                onClick={() =>
                                                                    typeof page ===
                                                                    "number"
                                                                        ? handlePageChange(
                                                                              page
                                                                          )
                                                                        : null
                                                                }
                                                                disabled={
                                                                    page ===
                                                                    "..."
                                                                }
                                                                style={{
                                                                    minWidth:
                                                                        "45px",
                                                                }}
                                                            >
                                                                {page}
                                                            </button>
                                                        </li>
                                                    )
                                                )}

                                                <li
                                                    className={`page-item ${
                                                        !pagination.next
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link border-0 rounded-3 me-2"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pagination.current +
                                                                    1
                                                            )
                                                        }
                                                        disabled={
                                                            !pagination.next
                                                        }
                                                        title="Trang tiếp theo"
                                                    >
                                                        <i className="bi bi-chevron-right"></i>
                                                    </button>
                                                </li>

                                                <li
                                                    className={`page-item ${
                                                        pagination.current ===
                                                        pagination.last
                                                            ? "disabled"
                                                            : ""
                                                    }`}
                                                >
                                                    <button
                                                        className="page-link border-0 rounded-3"
                                                        onClick={() =>
                                                            handlePageChange(
                                                                pagination.last
                                                            )
                                                        }
                                                        disabled={
                                                            pagination.current ===
                                                            pagination.last
                                                        }
                                                        title="Trang cuối cùng"
                                                    >
                                                        <i className="bi bi-chevron-double-right"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
