import './App.css';
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import AdminLayout from './Layout/AdminLayout';
import AdDashboard from './Component/Admin/AdDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YatraDetail from './Component/Admin/MasterData/Yatra/YatraDetail';
import AddYatra from './Component/Admin/MasterData/Yatra/AddYatra';
import Login from './Component/Admin/Login/Login';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import Register from './Component/Admin/Login/Register';
import MasterDataDetails from './Component/Admin/MasterData/MasterDataDetails';
import AddMasterData from './Component/Admin/MasterData/AddMasterData';
import NewsUpdateDetails from './Component/Admin/MasterData/NewsUpdate/NewsUpdateDetails';
import AddNewsUpdate from './Component/Admin/MasterData/NewsUpdate/AddNewsUpdate';
import PhotoAlbumDetails from './Component/Admin/MasterData/Gallery/PhotoAlbum/PhotoAlbumDetails';
import AddPhotoAlbum from './Component/Admin/MasterData/Gallery/PhotoAlbum/AddPhotoAlbum';
import AddPhotoGallery from './Component/Admin/MasterData/Gallery/PhotoGallery/AddPhotoGallery';
import PhotoGalleryDetails from './Component/Admin/MasterData/Gallery/PhotoGallery/PhotoGalleryDetails';
import AudioGalleryDetails from './Component/Admin/MasterData/Gallery/AudioGallery/AudioGalleryDetails';
import AddAudioGallery from './Component/Admin/MasterData/Gallery/AudioGallery/AddAudioGallery';
import VideoGalleryDetails from './Component/Admin/MasterData/Gallery/VideoGallery/VideoGalleryDetails';
import AddVideoGallery from './Component/Admin/MasterData/Gallery/VideoGallery/AddVideoGallery';
import ThreeSixtyDegreeGalleryDetails from './Component/Admin/MasterData/Gallery/ThreeSixtyDegreeGallery/ThreeSixtyDegreeGalleryDetails';
import AddThreeSixtyDegreeGallery from './Component/Admin/MasterData/Gallery/ThreeSixtyDegreeGallery/AddThreeSixtyDegreeGallery';
import DownloadQrCode from './Component/Admin/MasterAttraction/DownloadQrCode';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FeedbackDetail from './Component/Admin/Feedback/FeedbackDetail';
import AttractionTypeDetail from './Component/Admin/MasterAttraction/AttractionTypeDetail';
import AttractionDetail from './Component/Admin/MasterAttraction/AttractionDetails';
import AddAttraction from './Component/Admin/MasterAttraction/AddAttraction';
import AddAttractionType from './Component/Admin/MasterAttraction/AddAttractionType';

function App() {
  const [authData, setAuthData] = useState({});
  useEffect(() => {
    validateToken();
  }, []);

  const validateToken = () => {
    let data = {
      isAuthenticated: false,
      role: "",
      name: "",
      email: "",
      mobile: "",
    }
    try {
      var storaData = localStorage.getItem(process.env.REACT_APP_STORAGE_KEY) ?? JSON.stringify(data);
      storaData = storaData.replace("\"{", "'{").replace("}\"", "}'")
      storaData = JSON.parse(storaData);
      var token = storaData?.accessToken;
      var decodedToken = jwtDecode(token);
      if (decodedToken?.exp === undefined || new Date() > new Date(decodedToken?.exp * 1000)) {
        <Navigate to="/admin/login" replace={true}></Navigate>
        return;
      }
      setAuthData({ ...storaData });
    } catch (error) {
      console.log("invalid token", error);
      <Navigate to="/admin/login" replace={true}></Navigate>
    }
  }

  window.addEventListener('storage', () => {
    validateToken();
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AdminLayout authData={authData} />}>
          <Route path="/" element={<AdDashboard />} />
            <Route path="/admin/Dashboard" element={<AdDashboard />} />
            <Route path="/admin/attraction/details" element={<AttractionDetail />} />
            <Route path="/admin/attraction/type/details" element={<AttractionTypeDetail />} />
            <Route path="/admin/attraction/add" element={<AddAttraction />} />
            <Route path="/admin/master/yatra/detail" element={<YatraDetail />} />
            <Route path="/admin/feedback/detail" element={<FeedbackDetail />} />
            <Route path="/admin/master/yatra/add" element={<AddYatra />} />
            <Route path="/admin/master/data/detail" element={<MasterDataDetails />} />
            <Route path="/admin/master/data/add" element={<AddMasterData />} />
            <Route path="/admin/master/newsupdate/detail" element={<NewsUpdateDetails />} />
            <Route path="/admin/master/newsupdate/add" element={<AddNewsUpdate />} />
            <Route path="/admin/master/photoalbum/detail" element={<PhotoAlbumDetails />} />
            <Route path="/admin/master/photoalbum/add" element={<AddPhotoAlbum />} />
            <Route path="/admin/master/photogallery/detail" element={<PhotoGalleryDetails />} />
            <Route path="/admin/master/photogallery/add" element={<AddPhotoGallery />} />
            <Route path="/admin/master/audiogallery/detail" element={<AudioGalleryDetails />} />
            <Route path="/admin/master/audiogallery/add" element={<AddAudioGallery />} />
            <Route path="/admin/master/videogallery/detail" element={<VideoGalleryDetails />} />
            <Route path="/admin/master/videogallery/add" element={<AddVideoGallery />} />
            <Route path="/admin/master/360DegreeGallery/detail" element={<ThreeSixtyDegreeGalleryDetails />} />
            <Route path="/admin/master/360DegreeGallery/add" element={<AddThreeSixtyDegreeGallery />} />
            <Route path="/admin/download/qr" element={<DownloadQrCode />} />  
            <Route path="/admin/attraction/type/add" element={<AddAttractionType />} />
          </Route>
          <Route path="/admin/login" element={<Login setAuthData={setAuthData} />} />
          <Route path="/admin/register" element={<Register />} />

        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
      <div className='api-loader' id='api-loader'>
        <LazyLoadImage effect='blur' src='assets/img/icons/loaderKashi.gif'></LazyLoadImage>
      </div>
    </div>
  );
}

export default App;
