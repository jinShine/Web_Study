export const HEADER_OPTIONS = (params) => ({
  GLOBAL: {
    "/section02/02-02-layout-header-global": {
      hasLogo: true,
      hasBack: false,
      title: "게시글 수정",
    },
  },
  LOCAL: {
    [`/section02/02-03-layout-header-local/${params.id}`]: {
      hasLogo: true,
      hasBack: true,
    },
  },
});
