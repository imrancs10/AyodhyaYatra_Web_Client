import './App.css';
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import AdminLayout from './Layout/AdminLayout';
import PublicLayout from './Layout/PublicLayout';
import AdDashboard from './Component/Admin/AdDashboard';
import TempleDetails from './Component/Admin/Temples/TempleDetails';
import AddTemples from './Component/Admin/Temples/AddTemples';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YatraDetail from './Component/Admin/MasterData/Yatra/YatraDetail';
import AddYatra from './Component/Admin/MasterData/Yatra/AddYatra';
import Login from './Component/Admin/Login/Login';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import Register from './Component/Admin/Login/Register';
import Home from './Component/Public/Pages/Home/Home';
import MasterDataDetails from './Component/Admin/MasterData/MasterDataDetails';
import AddMasterData from './Component/Admin/MasterData/AddMasterData';
import TouristGuideByMap from './Component/Public/Pages/TouristMap/TouristGuideByMap';
import PadavDetail from './Component/Admin/MasterData/Padav/PadavDetail';
import AddPadav from './Component/Admin/MasterData/Padav/AddPadav';
import NewsUpdateDetails from './Component/Admin/MasterData/NewsUpdate/NewsUpdateDetails';
import AddNewsUpdate from './Component/Admin/MasterData/NewsUpdate/AddNewsUpdate';
import Yatras from './Component/Public/Pages/Yatra/Yatras';
import OverviewAndConcept from './Component/Public/Pages/OverviewAndConcept';
import PersonalityOfVaranasi from './Component/Public/Pages/PersonalityOfVaranasi';
import TermsConditions from './Component/Public/Pages/TermsConditions';
import PrivacyPolicy from './Component/Public/Pages/PrivacyPolicy';
import CopyrightPolicy from './Component/Public/Pages/CopyrightPolicy';
import Temple from './Component/Public/Pages/Temples/Temple';
import Ghat from './Component/Public/Pages/Litreture/Ghat';
import Helpline from './Component/Public/Pages/Helpline';
import Map from './Component/Public/Pages/Map';
import KeyFacts from './Component/Public/Pages/KeyFacts';
import BusTicketingForTourist from './Component/Public/Pages/BusTicketingForTourist';
import FamousTemple from './Component/Public/Pages/FamousTemple';
import ContactUs from './Component/Public/Pages/ContactUs';
import HyperlinkingPolicy from './Component/Public/Pages/HyperlinkingPolicy';
import FAQ from './Component/Public/Pages/FAQ';
import DosDonts from './Component/Public/Pages/DosDonts';
import Directory from './Component/Public/Pages/Directory';
import Feedback from './Component/Public/Pages/Feedback';
import OnlineReligiousYatra from './Component/Public/Pages/OnlineReligiousYatra';
import Heritage from './Component/Public/Pages/Litreture/Heritage';
import GangaAarti from './Component/Public/Pages/Litreture/GangaAarti';
import PhotoGallery from './Component/Public/Pages/Gallery/PhotoGallery';
import PhotoGalleryImage from './Component/Public/Pages/Gallery/PhotoGalleryImage';
import VideoGallery from './Component/Public/Pages/Gallery/VideoGallery';
import AudioGallery from './Component/Public/Pages/Gallery/AudioGallery';
import Demography from './Component/Public/Pages/Demography';
import NewsEvents from './Component/Public/Pages/NewsEvents';
import KashiVishwanath from './Component/Public/Pages/Temples/kashiVishwanath';
import BHU from './Component/Public/Pages/Temples/BHU';
import Sarnath from './Component/Public/Pages/Temples/Sarnath';
import Sankatmochan from './Component/Public/Pages/Temples/Sankatmochan';
import Prayagraj from './Component/Public/Pages/Prayagraj';
import Mirzapur from './Component/Public/Pages/Mirzapur';
import History from './Component/Public/Pages/History';
import DegreeGallery from './Component/Public/Pages/Gallery/DegreeGallery';
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
import TouristGuide from './Component/Public/Pages/TouristGuide/TouristGuide';
import VaranasiFuture from './Component/Public/Pages/VaranasiFuture';
import TouristGuideDetails from './Component/Public/Pages/TouristGuide/TouristGuideDetails';
import PadavDetails from './Component/Public/Pages/Yatra/PadavDetails';
import QrLanding from './Component/Public/Common/QrLanding';
import Temple360Gallery from './Component/Public/Pages/Temples/Temple360Gallery';
import SiteMap from './Component/Public/Pages/SiteMap';
import DownloadQrCode from './Component/Admin/Temples/DownloadQrCode';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import FeedbackDetail from './Component/Admin/Feedback/FeedbackDetail';

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
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/yatras" element={<Yatras />} />
            <Route path="/TouristGuideByMap?showFull=1" element={<TouristGuideByMap />} />
            <Route path="/TouristGuideByMap" element={<TouristGuideByMap />} />
            <Route path="/AboutKashiYatra" element={<OverviewAndConcept />} />
            <Route path="/AboutKashiYatra" element={<OverviewAndConcept />} />
            <Route path="/PersonalityOfVaranasi" element={<PersonalityOfVaranasi />} />
            <Route path="/TermsConditions" element={<TermsConditions />} />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/CopyrightPolicy" element={<CopyrightPolicy />} />
            <Route path="/temple" element={<Temple />} />
            <Route path="/Home/TempleDetails" element={<Temple />} />
            <Route path="/ghat" element={<Ghat />} />
            <Route path="/Helpline" element={<Helpline />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/KeyFacts" element={<KeyFacts />} />
            <Route path='/BusTicketingForTourist' element={<BusTicketingForTourist />} />
            <Route path='/FamousTemple' element={<FamousTemple />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/HyperlinkingPolicy' element={<HyperlinkingPolicy />} />
            <Route path='/FAQ' element={<FAQ />} />
            <Route path='/DosDonts' element={<DosDonts />} />
            <Route path='/Directory' element={<Directory />} />
            <Route path='/Feedback' element={<Feedback />} />
            <Route path='/OnlineReligiousYatra' element={<OnlineReligiousYatra />} />
            <Route path='/Heritage' element={<Heritage />} />
            <Route path='/GangaAarti' element={<GangaAarti />} />
            <Route path='/PhotoGallery' element={<PhotoGallery />} />
            <Route path='/PhotoGalleryImage' element={<PhotoGalleryImage />} />
            <Route path='/VideoGallery' element={<VideoGallery />} />
            <Route path='/AudioGallery' element={<AudioGallery />} />
            <Route path='/Temple360Gallery' element={<Temple360Gallery />} />
            <Route path='/Demography' element={<Demography />} />
            <Route path='/NewsEvents' element={<NewsEvents />} />
            <Route path='/KashiVishwanath' element={<KashiVishwanath />} />
            <Route path='/BHU' element={<BHU />} />
            <Route path='/Sarnath' element={<Sarnath />} />
            <Route path='/Sankatmochan' element={<Sankatmochan />} />
            <Route path='/Prayagraj' element={<Prayagraj />} />
            <Route path='/Mirzapur' element={<Mirzapur />} />
            <Route path='/History' element={<History />} />
            <Route path='/DegreeGallery' element={<DegreeGallery />} />
            <Route path='/TouristGuide' element={<TouristGuide/>}/>
            <Route path='/TouristGuideDetails' element={<TouristGuideDetails/>}/>
            <Route path='/padavDetails' element={<PadavDetails/>}/>
            <Route path='/VaranasiFuture' element={<VaranasiFuture/>}/>
            <Route path='/QrLanding' element={<QrLanding/>}/>
            <Route path='/SiteMap' element={<SiteMap/>}/>
          </Route>
          <Route element={<AdminLayout authData={authData} />}>
            <Route path="/admin/Dashboard" element={<AdDashboard />} />
            <Route path="/admin/temple/details" element={<TempleDetails />} />
            <Route path="/admin/temple/add" element={<AddTemples />} />
            <Route path="/admin/master/yatra/detail" element={<YatraDetail />} />
            <Route path="/admin/feedback/detail" element={<FeedbackDetail />} />
            <Route path="/admin/master/yatra/add" element={<AddYatra />} />
            <Route path="/admin/master/padav/detail" element={<PadavDetail />} />
            <Route path="/admin/master/padav/add" element={<AddPadav />} />
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
