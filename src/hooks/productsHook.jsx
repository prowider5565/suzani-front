import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { instance } from "../api/axios";
import { toast } from "react-toastify";
import { addToLS, clearLS } from "../utils/localStorage";

// export const getAllProducts = ({
//   typeFilter = "default",
//   isReversed = false,
//   pagination = 1,
// }) => {
//   return useQuery(
//     ["getAllProducts", typeFilter, isReversed, pagination],
//     () => instance.get(`products/list/?page=${pagination}`),
//     {
//       refetchOnWindowFocus: false,
//       select: (data) => {
//         let results = data?.data?.results;

//         if (typeFilter !== "default") {
//           results = results?.sort((a, b) => {
//             if (typeFilter === "price") {
//               return a.price - b.price;
//             } else if (typeFilter === "name") {
//               const nameA = a.name.toLowerCase();
//               const nameB = b.name.toLowerCase();
//               if (nameA < nameB) return -1;
//               if (nameA > nameB) return 1;
//               return 0;
//             }
//           });

//           if (isReversed) {
//             results = results.reverse();
//           }
//         }

//         return { ...data.data, results };
//       },
//       onError: (error) => {
//         toast.error("Qandaydir xatolik bor");
//         console.log(error);
//       },
//     }
//   );
// };

export const getAllProducts = ({
    typeFilter,
    isReversed,
    type,
    value,
    setDataInp,
    pagination = 1,
    paginations = 1,
}) => {
    return useQuery(
        ["getAllProducts"],
        () =>
            instance.get(
                `${
                    type === "search" && value
                        ? `products/list/?search=${value}&page=${pagination}`
                        : `products/list/?page=${pagination}`
                }`
            ),
        {
            refetchOnWindowFocus: false,
            enabled: false,
            select: (data) => {
                const sortedArr = data?.data?.results?.sort((a, b) => {
                    if (typeFilter === "price") {
                        return a.price - b.price;
                    } else if (typeFilter === "name") {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    }
                });

                if (typeFilter === "default") {
                    return data?.data;
                } else if (isReversed && typeFilter !== "default") {
                    return sortedArr;
                } else if (!isReversed && typeFilter !== "default") {
                    return sortedArr.reverse();
                }
            },
            onError: (error) => {
                toast.error("Qandaydir xatolik bor");
                console.log(error);
            },
        }
    );
};
export const getASingleProduct = (id) => {
    return useQuery(
        ["getSingleProduct"],
        () => instance.get(`products/detail/${id}/`),
        {
            refetchOnWindowFocus: false,
            enabled: true,
            // onSuccess: (data) => console.log(data),
            select: (data) => data?.data,
            onError: (error) => {
                toast.error("Qandaydir xatolik bor");
                console.log(error);
            },
        }
    );
};

export const getCategoryTitle = () => {
    return useQuery(
        ["getCategoryTitle"],
        () => instance.get(`/products/categories/`),
        {
            refetchOnWindowFocus: false,
            // onSuccess: (data) => console.log(data),
            onError: (error) => {
                console.log(error);
            },
        }
    );
};

export const getCarausel = () => {
    return useQuery(
        ["getcarausel"],
        () => instance.get(`/social/advertisements/`),
        {
            refetchOnWindowFocus: false,
            select: (data) => {
                return data?.data;
            },
            onError: (error) => {
                console.log(error);
            },
        }
    );
};
export const getCompanyInfo = () => {
    return useQuery(["getcompany"], () => instance.get(`/companyinfo/`), {
        refetchOnWindowFocus: false,
        // onSuccess: (data) => console.log(data),
        select: (data) => {
            return data?.data;
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
export const getSeachFilter = (param) => {
    return useQuery(
        ["getFilter"],
        () => instance.get(`/search?search=${param}`),
        {
            refetchOnWindowFocus: false,
            enabled: true,
            onError: (error) => {
                console.log(error);
            },
        }
    );
};
export const Register = ({ setisSuccessOtp }) => {
    return useMutation(
        (data) => instance.post("/accounts/verify-email/", data),
        {
            onSuccess: (data) => {
                toast.success("Success");
                setisSuccessOtp(true);
            },
            onError: (error) => {
                console.log(error);
                toast.error("Qandaydir xatolik bor");
            },
        }
    );
};
export const Login = () => {
    return useMutation(
        (data) => instance.post("/accounts/login/", data),
        {
            onSuccess: (data) => {
                toast.success("Success");
                console.log(data)
            },
            onError: (error) => {
                console.log(error);
                toast.error("Qandaydir xatolik bor");
            },
        }
    );
};
export const OtpVerify = () => {
    return useMutation((data) => instance.post("/accounts/register/", data), {
        onSuccess: (data) => {
            console.log(data);
            addToLS("access", data?.data?.access);
            toast.success("Success otp");
        },
        onError: (error) => {
            console.log(error);
            toast.error("Qandaydir xatolik bor");
        },
    });
};

export const postReview = () => {
    return useMutation(
        (reviewData) => instance.post("products/reviews/", reviewData),
        {
            onSuccess: (data) => {
                toast.success("Review submitted successfully");
                console.log(data);
            },
            onError: (error) => {
                toast.error("An error occurred while submitting the review");
                console.log(error);
            },
        }
    );
};

export const getProductReviews = (product_id) => {
    return useQuery(
        ["getProductReviews", product_id],
        () => instance.get(`/products/reviews/?product_id=${product_id}`),
        {
            refetchOnWindowFocus: false,
            select: (data) => data?.data?.results,
            onSuccess: (data) => {
                console.log("Received data:", data.results);
            },
            onError: (error) => {
                toast.error("Qandaydir xatolik bor");
                console.log(error);
            },
        }
    );
};

export const getUserData = () => {
    return useQuery(
        ["getUserData"],
        () =>
            instance.get(`/accounts/me`, {
                // headers: {
                //     Authorization: `Bearer ${token}`,
                // },
            }),
        {
            refetchOnWindowFocus: false,
            select: (data) => data?.data,
            // onSuccess: (data) => {
            //     console.log("Received data:", data);
            // },
            onError: (error) => {
                toast.error("Qandaydir xatolik bor");
                console.log(error);
            },
        }
    );
};

export const getSocialLinks = () => {
    return useQuery(["getSocialLinks"], () => instance.get(`/social/links/`), {
        refetchOnWindowFocus: false,
        select: (data) => {
            return data?.data;
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
