const apiPrfix = "v1";
export const apiUrls = {
    fileUploadController: {
        uploadFiles: `${apiPrfix}/ImageUpload/upload`,
        getImageByModNameModId: `${apiPrfix}/ImageUpload/image/get/modName/id`,
        deleteImage: `${apiPrfix}/ImageUpload/image/delete/id?id=`,
    },
    templeController: {
        AddTemple: `${apiPrfix}/temples/temple`,
        deleteTemple: `${apiPrfix}/temples/temple/delete`,
        searchTemple: `${apiPrfix}/temples/temple/search`,
        updateTemple: `${apiPrfix}/temples/temple`,
        getTemples: `${apiPrfix}/temples/temple`,
        getTempleById: `${apiPrfix}/temples/temple/get`,
        getTempleByIdOrbarcodeId: `${apiPrfix}/temples/barcodetemple/get`,
        getTempleByYatraId: `${apiPrfix}/Temples/temple/get/yatra/`,
        getTempleByPadavId: `${apiPrfix}/Temples/temple/get/padav/`,
    },
    masterDataController: {
        getYatras: `${apiPrfix}/masterdata/get/yatras`,
        getYatraById: `${apiPrfix}/masterdata/yatra/get`,
        getMasterData: `${apiPrfix}/masterdata/master/data`,
        getMasterDataByTypes: `${apiPrfix}/MasterData/master/data/types?`,
        getMasterDataById: `${apiPrfix}/masterdata/master/data/`,
        updateMasterData: `${apiPrfix}/masterdata/master/data`,
        getPadavs: `${apiPrfix}/masterdata/get/padavs`,
        getPadavByYatraId: `${apiPrfix}/masterdata/get/padavs`,
        getPadavById: `${apiPrfix}/masterdata/padavs/get`,
        getDivisions: `${apiPrfix}/masterdata/get/divisions`,
        addYatras: `${apiPrfix}/masterdata/yatras`,
        addPadavs: `${apiPrfix}/masterdata/padavs`,
        addMasterData: `${apiPrfix}/masterdata/master/data`,
        addDivisions: `${apiPrfix}/masterdata/divisions`,
        deleteYatras: `${apiPrfix}/masterdata/yatras`,
        deletePadavs: `${apiPrfix}/masterdata/padavs`,
        deleteDivisions: `${apiPrfix}/masterdata/divisions`,
        deleteMasterData: `${apiPrfix}/masterdata/master/data`,
        getMasterDataDropdown: `${apiPrfix}/MasterData/master/data/dropdown?masterDataType=`,
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
}