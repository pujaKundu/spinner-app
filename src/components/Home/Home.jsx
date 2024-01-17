import {useState} from "react";
import {
  Form,
  SpinnerDetails,
  UserForm,
  UserInformation,
  Wheel,
} from "../index";
import {
  useSpinnerState,
  useUserState,
  useUserInformation,
} from "../../utils/statesUtils";
import "./Home.css";
import {
  useSpinnerDetailState,
  useSpinnerInformation,
} from "../../utils/statesUtils";

const Home = () => {

  const { isSpinnerOpen, setIsSpinnerOpen } = useSpinnerState();
  const {
    name,
    setName,
    email,
    setEmail,
    selectedDiscount,
    setSelectedDiscount,
    type,setType
  } = useUserState();

  const { userInformation, addUserInformation } = useUserInformation();

  const {
    setDiscountType,
    setColor,
    setDiscount,
    color,
    discountType,
    discount,
    duration,setDuration
  } = useSpinnerDetailState();

  const { spinnerInformation, addSpinnerInformation } = useSpinnerInformation();
  const [spinDuration,setSpinDuration]=useState(3000)

  const handleAddUser = (event) => {
    event.preventDefault();

    const isEmailUsed = userInformation.some((user) => user.email === email);


    if (isEmailUsed) {
      return;
    }
    const newUserInfo = {
      name,
      email,
      type,
      selectedDiscount,

    };

    addUserInformation(newUserInfo);

    setName("");
    setEmail("");
    setSelectedDiscount("");
    setType("%")
  };

  const handleAddSpinnerInfo = (event) => {
    event.preventDefault();

    const newSpinnerInfo = {
      discount,
      discountType,
      color,
      duration
    };

    addSpinnerInformation(newSpinnerInfo);

    setIsSpinnerOpen(true);

    setDiscount("");
    setDiscountType("");
    setColor("#ffee99");
    setDuration(3000)
  };

  return (
    <div className="container">
      <div className="spinner-details-container">
        <Form
          color={color}
          setColor={setColor}
          discount={discount}
          setDiscount={setDiscount}
          discountType={discountType}
          setDiscountType={setDiscountType}
          duration={duration}
          setDuration={setDuration}
          setIsSpinnerOpen={setIsSpinnerOpen}
          handleAddSpinnerInfo={handleAddSpinnerInfo}

        />
        <SpinnerDetails spinnerInformation={spinnerInformation} />
      </div>

      <UserInformation userInformation={userInformation} spinDuration={spinDuration} />
      <div className="spinner-container">
        {isSpinnerOpen && (
          <UserForm
            setIsSpinnerOpen={setIsSpinnerOpen}
            email={email}
            setName={setName}
            setEmail={setEmail}
            handleAddUser={handleAddUser}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            spinnerInformation={spinnerInformation}
            setType={setType}
            userInformation={userInformation}
            setSpinDuration={setSpinDuration}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
