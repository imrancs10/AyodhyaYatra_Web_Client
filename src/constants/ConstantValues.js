
const toastMessage = {
    saveSuccess: 'Added successfully!',
    saveError:'Error while adding record. Please try after sometime!',
    updateSuccess: 'Updated successfully!',
    updateError:'Error while updating record. Please try after sometime!',
    fileUploadSuccess: 'File uploaded successfully!',
    fileUploadError:'Error while uploading the files. Please try after sometime!',
    deleteSuccess: 'Deleted successfully!',
    deleteError:'Error while deleting record. Please try after sometime!',
    getError:'Error while getting record. Please try after sometime!',
    invalidMonthSelection:'you can not select future month!',
    invalidToDate:'To date is less than From date!',
    alreadyCancelled:"An order is already cancelled!",
    alreadyDeleted:"An order is already deleted!",
    emailSent:"Email has been sent!",
    invalidSearchLength:"Search text should be minimum 3 char!"
};
const defaultQueryParams={
    paging:"?pageNo=1&PageSize=10000"
}

export { toastMessage,defaultQueryParams };