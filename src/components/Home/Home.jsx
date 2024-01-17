import React from "react";
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
  } = useSpinnerDetailState();
  const { spinnerInformation, addSpinnerInformation } = useSpinnerInformation();

  const handleAddUser = (event) => {
    event.preventDefault();

    const isEmailUsed = userInformation.some((user) => user.email === email);

    if (isEmailUsed) {
      // alert('Email is already used. Each user can spin the wheel only once.');
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
    };

    addSpinnerInformation(newSpinnerInfo);

    setIsSpinnerOpen(true);

    setDiscount("");
    setDiscountType("");
    setColor("#ffee99");
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
          setIsSpinnerOpen={setIsSpinnerOpen}
          handleAddSpinnerInfo={handleAddSpinnerInfo}
        />
        <SpinnerDetails spinnerInformation={spinnerInformation} />
      </div>

      <UserInformation userInformation={userInformation} />
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

          />
        )}
      </div>
    </div>
  );
};

export default Home;
