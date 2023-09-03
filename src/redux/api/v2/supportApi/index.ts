import { apiSliceV2 } from "../apiSlice";

const supportApiSlice = apiSliceV2.injectEndpoints({
    endpoints: (builder) => ({
        getAllSupportApiCategories: builder.query({
            query: () => ({
                url: "Support/GetAllSupportCategory",
            }),
        }),
        getAllCustomerSupports: builder.query({
            query: () => ({
                url: "Support/GetAllCustomerSupports",
            }),
        }),
        createSupport: builder.mutation({
            query: (body: {
                categoryId: number;
                tripID: number;
                customerMessage: string;
            }) => ({
                url: "Support/CreateSupport",
                method: "POST",
                body: body,
            }),
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllSupportApiCategoriesQuery,
    useGetAllCustomerSupportsQuery,
    useCreateSupportMutation,
} = supportApiSlice;
