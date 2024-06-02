const apiPrfix = "v1";
export const apiUrls = {
    fileUploadController: {
        uploadFiles: `${apiPrfix}/ImageUpload/upload`,
        getImageByModNameModId: `${apiPrfix}/ImageUpload/image/get/modName/id`,
        deleteImage: `${apiPrfix}/ImageUpload/image/delete/id?id=`,
    },
    masterAttractionsController: {
        AddAttraction: `${apiPrfix}/master/attraction`,
        deleteAttraction: `${apiPrfix}/master/attraction/delete`,
        searchAttraction: `${apiPrfix}/master/attraction/search`,
        updateAttraction: `${apiPrfix}/master/attraction`,
        getAllAttractions: `${apiPrfix}/master/attraction`,
        getAttractionById: `${apiPrfix}/master/attraction/get`,
        getAttractionByIdOrbarcodeId: `${apiPrfix}/master/attraction/get/by/id/barcode`,
        generateAttractionQRcodeId: `${apiPrfix}/master/attraction/generate/qr/code`,
        getAttractionByYatraId: `${apiPrfix}/master/attraction/get/yatra/`,

        AddAttractionType: `${apiPrfix}/master/attraction/type`,
        deleteAttractionType: `${apiPrfix}/master/attraction/type/delete`,
        searchAttractionType: `${apiPrfix}/master/attraction/type/search`,
        updateAttractionType: `${apiPrfix}/master/attraction/type`,
        getAllAttractionTypes: `${apiPrfix}/master/attraction/type`,
        getAttractionTypeByCode: `${apiPrfix}/master/attraction/type/get/code`,
        getAttractionTypeById: `${apiPrfix}/master/attraction/type/get/`,
    },
    masterDataController: {
        getYatras: `${apiPrfix}/get/yatras`,
        getYatraById: `${apiPrfix}/yatra/get`,
        getMasterData: `${apiPrfix}/master/data`,
        getMasterDataByTypes: `${apiPrfix}/master/data/types?`,
        getMasterDataById: `${apiPrfix}/master/data/`,
        updateMasterData: `${apiPrfix}/master/data`,
        getPadavs: `${apiPrfix}/get/padavs`,
        getPadavByYatraId: `${apiPrfix}/get/padavs`,
        getPadavById: `${apiPrfix}/padavs/get`,
        getDivisions: `${apiPrfix}/get/divisions`,
        addYatras: `${apiPrfix}/yatras`,
        addPadavs: `${apiPrfix}/padavs`,
        addMasterData: `${apiPrfix}/master/data`,
        addDivisions: `${apiPrfix}/divisions`,
        deleteYatras: `${apiPrfix}/yatras`,
        deletePadavs: `${apiPrfix}/padavs`,
        deleteDivisions: `${apiPrfix}/divisions`,
        deleteMasterData: `${apiPrfix}/master/data`,
        getMasterDataDropdown: `${apiPrfix}/master/data/dropdown?masterDataType=`,
    },
    attractionYatraMapperController:{
        add:`${apiPrfix}/master/attraction/yatra/mapper`,        
        delete: `${apiPrfix}/master/attraction/yatra/mapper/delete`,
        search: `${apiPrfix}/master/attraction/yatra/mapper/search`,
        update: `${apiPrfix}/master/attraction/yatra/mapper`,
        getAlls: `${apiPrfix}/master/attraction/yatra/mapper`,
        getByYatraId: `${apiPrfix}/master/attraction/yatra/mapper/get/by/yatra`,
        getById: `${apiPrfix}/master/attraction/yatra/mapper/get/`,
    },
    authController: {
        login: `${apiPrfix}/auth/user/login`,
        register: `${apiPrfix}/auth/user/register`,
        changePassword: `${apiPrfix}/auth/user/change/password`,
        emailVerify: `${apiPrfix}/auth/user/verify/email`,
        resetPassword: `${apiPrfix}/auth/user/reset/password`,
        updateProfile: `${apiPrfix}/auth/user/update/profile`,
    },
    newsUpdateController: {
        getNewsUpdate: `${apiPrfix}/newsUpdate/get/newsupdate`,
        addNewsUpdate: `${apiPrfix}/newsupdate/add/newsupdate`,
        updateNewsUpdate: `${apiPrfix}/newsupdate/update/newsupdate`,
        getNewsUpdateyId: `${apiPrfix}/newsUpdate/newsupdate/get`,
        deleteNewsUpdate: `${apiPrfix}/newsUpdate/delete`,
    },

    galleryController: {
        // photo Album
        getPhotoAlbum: `${apiPrfix}/gallery/get/album`,
        addPhotoAlbum: `${apiPrfix}/gallery/add/album`,
        updatePhotoAlbum: `${apiPrfix}/gallery/update/album`,
        getPhotoAlbumById: `${apiPrfix}/gallery/album/get`,
        deletePhotoAlbum: `${apiPrfix}/gallery/delete/album`,

        // photo Gallery
        getPhotoGallery: `${apiPrfix}/gallery/get/photogallery`,
        addPhotoGallery: `${apiPrfix}/gallery/add/photogallery`,
        updatePhotoGallery: `${apiPrfix}/gallery/update/photogallery`,
        getPhotoGalleryById: `${apiPrfix}/gallery/photogallery/get`,
        getPhotoGalleryByAlbumId: `${apiPrfix}/gallery/photogallery/get/album`,
        deletePhotoGallery: `${apiPrfix}/gallery/delete/photogallery`,

        // audio Gallery
        getAudioGallery: `${apiPrfix}/gallery/get/audiogallery`,
        addAudioGallery: `${apiPrfix}/gallery/add/audiogallery`,
        updateAudioGallery: `${apiPrfix}/gallery/update/audiogallery`,
        getAudioGalleryById: `${apiPrfix}/gallery/audiogallery/get`,
        deleteAudioGallery: `${apiPrfix}/gallery/delete/audiogallery`,

        // video Gallery
        getVideoGallery: `${apiPrfix}/gallery/get/videogallery`,
        addVideoGallery: `${apiPrfix}/gallery/add/videogallery`,
        updateVideoGallery: `${apiPrfix}/gallery/update/videogallery`,
        getVideoGalleryById: `${apiPrfix}/gallery/videogallery/get`,
        deleteVideoGallery: `${apiPrfix}/gallery/delete/videogallery`,

        // 360 Gallery
        get360DegreeGallery: `${apiPrfix}/gallery/get/threesixtydegreegallery`,
        add360DegreeGallery: `${apiPrfix}/gallery/add/threesixtydegreegallery`,
        update360DegreeGallery: `${apiPrfix}/gallery/update/threesixtydegreegallery`,
        get360DegreeGalleryById: `${apiPrfix}/gallery/threesixtydegreegallery/get`,
        delete360DegreeGallery: `${apiPrfix}/gallery/delete/threesixtydegreegallery`,
    },

    feedbackController: {
        getFeedback: `${apiPrfix}/feedback/get/feedback`,
        addFeedback: `${apiPrfix}/feedback/add/feedback`,
        getDashboardCount: `${apiPrfix}/feedback/get/dashboardCount`,
        // updateNewsUpdate: `${apiPrfix}/newsupdate/update/newsupdate`,
        // getNewsUpdateyId: `${apiPrfix}/newsUpdate/newsupdate/get`,
        // deleteNewsUpdate: `${apiPrfix}/newsUpdate/delete`,
    },
    visitorContrller:{
        getVisitor:`${apiPrfix}/visitors/get/`,
    }
}