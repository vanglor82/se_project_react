import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  onClick,
  onCardLike,
  isLoggedIn,
  onLogout,
  onEditProfile,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        {<SideBar onLogout={onLogout} onEditProfile={onEditProfile} />}
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onClick={onClick}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
