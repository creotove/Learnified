import { Button } from "../../utils";
import cheveronUpIcon from "../../assets/icons/pack/cheveronUpIcon.svg";
import axios from "../../apis/affiliate-user";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const SingleCourse = ({ id, name, image, enrolledBy, alreadyPurchased }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const becomeAnAffiliate = async (e, packageId) => {
    try {
      e.preventDefault();
      e.stopPropagation();
      if (alreadyPurchased) return;
      if (localStorage.getItem("accessToken")) {
        const res = await axios.post(
          `/become-an-affiliate?packageId=${packageId}&userId=${auth?.user?._id}`
        );
        if (res.data.success) {
          navigate("/dashboard/my-courses");
        }
      } else {
        navigate("/log-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id={id} className="flex shadow-lg p-5 rounded-xl flex-col md:flex-row">
      <img
        src={image ? image : "https://via.placeholder.com/150"}
        alt="Course"
        className="rounded-lg w-36 h-36 object-cover"
      />
      <div className="ms-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-[#A09E9E]">Follow these easy and simple step</p>
        </div>
        <div className="md:justify-between md:flex md:flex-wrap flex flex-col lg:flex-row items-center gap-5 my-5">
          <Button
            label={
              <span className="flex justify-center items-center gap-2">
                <p className="rounded-md text-white p-1 bg-[#a454eb] text-sm md:text-base">
                  {enrolledBy < 10 ? `0${enrolledBy}` : enrolledBy}
                </p>
                <p className="text-sm md:text-base">Enrolled</p>
              </span>
            }
            varient={"outlined"}
            className=""
          />
          <button
            className={`text-white bg-[#a454eb] rounded-md h-10 px-2`}
            onClick={(e) => becomeAnAffiliate(e, id)}
          >
            <div className="flex justify-center items-center whitespace-nowrap">
              <p className="text-sm md:text-base">
                {alreadyPurchased ? (
                  "Already Enrolled"
                ) : (
                  <span className="flex justify-center items-center">
                    Enroll Now
                    <img src={cheveronUpIcon} />
                  </span>
                )}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
