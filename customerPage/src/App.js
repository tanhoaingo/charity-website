import { HomePage } from "./pages/homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import "./assets/css/main.css";
import { DonatePage } from "./pages/donatepage/DonatePage";
import { PayPage } from "./pages/paypage/PayPage";
import { PayCompletePage } from "./pages/paypage/PayCompletePage";
import { Login } from "./pages/auth/Login";
import { SignUp } from "./pages/auth/SignUp";
import { Volunteer } from "./pages/homePage/VolunteerPage";
import { FaqPage } from "./pages/homePage/FaqPage";
import { AnaLysicItem } from "./pages/analysic/AnalysicItem";
import { AnalysicStatement } from "./pages/analysic/AnalysicStatement";
import { AnalysicUser } from "./pages/analysic/AnalysicUser";
import { TestTable } from "./pages/analysic/TestTable";
import { CreatePostPage } from "./pages/post/createpost/CreatePostPage";
import { PostPage } from "./pages/post/post/PostPage";
import { ListPostAll } from "./pages/post/listpost/ListPostAll";
import { ListPostCovid } from "./pages/post/listpost/ListPostCovid";
import { ListPostChildren } from "./pages/post/listpost/ListPostChildren";
import { ListPostPoorPeople } from "./pages/post/listpost/ListPostPoorPeople";
import { ListPostHeart } from "./pages/post/listpost/ListPostHeart";
import { ListPostOldPeople } from "./pages/post/listpost/ListPostOldPeople";
import { ListPostDisability } from "./pages/post/listpost/ListPostDisability";
import { ListPost1 } from "./pages/post/listpost/listPostOwner/ListPost1";
import { ListPost2 } from "./pages/post/listpost/listPostOwner/ListPost2";
import { ListPost3 } from "./pages/post/listpost/listPostOwner/ListPost3";
import { ListPost4 } from "./pages/post/listpost/listPostOwner/ListPost4";
import { ListPost5 } from "./pages/post/listpost/listPostOwner/ListPost5";
import { ListPost6 } from "./pages/post/listpost/listPostOwner/ListPost6";
import { AnalysicResult } from "./pages/analysic/AnalysicResult";
import { DashBoard } from "./pages/dashboard/DashBoard";
import { DashBoardUser } from "./pages/dashboard/DashBoardUser";
import { DashBoardChuongTrinh } from "./pages/dashboard/DashBoardChuongTrinh";
import { DashBoardMonthly } from "./pages/dashboard/DashBoardMonthly";
import { DashBoardVolunteer } from "./pages/dashboard/DashBoardVolunteer";
import { VolunteerSuccessPage } from "./pages/homePage/VolunteerSuccessPage";
import { DonateMonthlyPage } from "./pages/donatepage/DonateMonthlyPage";
import { RegisterOrgnizationPage } from "./pages/homePage/RegisterOrgnizationPage";
import { ChuongTrinhSuccessPage } from "./pages/homePage/ChuongTrinhSuccessPage";
import { DashBoardVolunteerAdmin } from "./pages/dashboard/DashBoardVolunteerAdmin";
import { DashBoardChuongTrinhAdmin } from "./pages/dashboard/DashBoardChuongTrinhAdmin";
import { Profile } from "./pages/auth/Profile";
import { ProfilePassword } from "./pages/auth/ProfilePassword";
import { ProfileDonate } from "./pages/auth/ProfileDonate";
import { ProfileVolunteer } from "./pages/auth/ProfileVolunteer";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donate-monthly" element={<DonateMonthlyPage />} />
        <Route path="/paying" element={<PayPage />} />
        <Route path="/paying-complete" element={<PayCompletePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/password" element={<ProfilePassword />} />
        <Route path="/profile/donate" element={<ProfileDonate />} />
        <Route path="/profile/volunteer" element={<ProfileVolunteer />} />

        {/* link  */}
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/volunteer/success" element={<VolunteerSuccessPage />} />
        <Route
          path="/register-orginization"
          element={<RegisterOrgnizationPage />}
        />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/analysic" element={<AnaLysicItem />} />
        <Route path="/user" element={<AnalysicUser />} />
        <Route path="/statement" element={<AnalysicStatement />} />
        <Route path="/achievement" element={<AnalysicResult />} />

        {/* post page */}
        <Route path="/createpost" element={<CreatePostPage />} />
        <Route
          path="/createpost-success"
          element={<ChuongTrinhSuccessPage />}
        />
        <Route path="/post" element={<PostPage />} />
        <Route path="/list" element={<ListPostAll />} />

        {/* link post type */}
        <Route path="/listpost/covid" element={<ListPostCovid />} />
        <Route path="/listpost/children" element={<ListPostChildren />} />
        <Route path="/listpost/poorpeople" element={<ListPostPoorPeople />} />
        <Route path="/listpost/heart" element={<ListPostHeart />} />
        <Route path="/listpost/oldpeople" element={<ListPostOldPeople />} />
        <Route path="/listpost/disability" element={<ListPostDisability />} />

        <Route path="/listpost/chuthapdo" element={<ListPost1 />} />
        <Route path="/listpost/tinhthuonghcm" element={<ListPost2 />} />
        <Route path="/listpost/bongsenvang" element={<ListPost3 />} />
        <Route path="/listpost/tuthien" element={<ListPost4 />} />
        <Route path="/listpost/hoicovidhcm" element={<ListPost5 />} />
        <Route path="/listpost/treemvietnam" element={<ListPost6 />} />

        {/* dash board */}
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/dashboard/donator" element={<DashBoardUser />} />
        <Route
          path="/dashboard/chuongtrinh"
          element={<DashBoardChuongTrinh />}
        />
        <Route path="/dashboard/monthly" element={<DashBoardMonthly />} />
        <Route path="/dashboard/volunteer" element={<DashBoardVolunteer />} />
        <Route
          path="/dashboard/postadmin"
          element={<DashBoardChuongTrinhAdmin />}
        />
        <Route
          path="/dashboard/checkuser"
          element={<DashBoardVolunteerAdmin />}
        />
      </Routes>
    </div>
  );
}

export default App;
