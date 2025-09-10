import React, { useEffect, useState } from "react";
import TableComp from "../../../components/Tables/TableComp";
import { UserTableColumns } from "../../../assets/TableColumns/UserTableColumns";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../../store/Slices/CustomerSlice";
import AddingLightLoader from "../../../components/Loaders/AddingLightLoader";
import DeleteModal from "../../../components/Modals/DeleteModal";
import { DeleteUserApi } from "../../../ApiRequests";
import { SuccessToast } from "../../../utils/ShowToast";
import ChangePasswordModal from "../../../components/Modals/ChangePasswordModal";
import StatsCards from "../../../components/Cards/StatsCards";
import Header from "../../../components/Header/Header";

const UserManagement = () => {
  const [CurrentTab, setCurrentTab] = useState("approved");

  const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [OpenChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Selected, setSelected] = useState(null);

  const CustomerState = useSelector((state) => state.CustomerState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, []);
  return (
    <div className="flex-1">
      <Header
        title={"User Management"}
        desc={"Manage and keep track of your users."}
      />

      {CustomerState.loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <AddingLightLoader />
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center">
            <StatsCards
              title={"Customer Overview"}
              statsData={[
                {
                  title: "Approved Customers",
                  value: Array.isArray(CustomerState.data)
                    ? CustomerState.data.filter((cu) => cu.is_approved === true)
                        ?.length || "0"
                    : "0",
                  subtitle: "",
                  textColor: "text-[green]",
                },
                {
                  title: "Pending Customers",
                  value: Array.isArray(CustomerState.data)
                    ? CustomerState.data.filter(
                        (cu) => cu.is_approved === false
                      )?.length || "0"
                    : "0",
                  subtitle: "",
                  textColor: "text-orange-500",
                },
              ]}
            />
            <div className="w-[100%] flex justify-center items-center bg-[#EFE7EC] rounded-[40px] font-[700] text-[1.5rem] mt-5 mb-8 max300:w-[95%]">
              <div
                className={`w-[50%] flex justify-center items-center rounded-[40px] ${
                  CurrentTab === "approved"
                    ? "bg-main text-white"
                    : "bg-[#EFE7EC] text-[#000]"
                } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2 max480:text-[1.1rem] max300:text-[.8rem]`}
                onClick={() => {
                  setCurrentTab("approved");
                }}
              >
                Approved
              </div>
              <div
                className={`w-[50%] flex justify-center items-center rounded-[40px] ${
                  CurrentTab === "requests"
                    ? "bg-main text-white"
                    : "bg-[#EFE7EC] text-[#000]"
                } py-3 transition-all ease-in-out duration-700 cursor-pointer max767:py-2 max480:text-[1.1rem] max300:text-[.8rem]`}
                onClick={() => {
                  setCurrentTab("requests");
                }}
              >
                Requests
              </div>
            </div>
          </div>

          {CurrentTab === "approved" &&
          Array.isArray(CustomerState.data) &&
          CustomerState.data.filter((cu) => cu.is_approved === true).length !==
            0 ? (
            <div className="w-full flex flex-col bg-white my-4">
              <TableComp
                Rows={CustomerState.data.filter(
                  (cu) => cu.is_approved === true
                )}
                Columns={UserTableColumns.filter(
                  (ct) => ct.id !== "user_actions"
                )}
                setOpenDeleteModal={setOpenDeleteModal}
                setOpenChangePasswordModal={setOpenChangePasswordModal}
                setSelected={setSelected}
              />
            </div>
          ) : (
            CurrentTab === "requests" &&
            Array.isArray(CustomerState.data) &&
            CustomerState.data.filter((cu) => cu.is_approved === false)
              .length !== 0 && (
              <div className="w-full flex flex-col bg-white my-4">
                <TableComp
                  Rows={CustomerState.data.filter(
                    (cu) => cu.is_approved === false
                  )}
                  Columns={UserTableColumns}
                />
              </div>
            )
          )}
        </>
      )}
      {OpenDeleteModal && (
        <DeleteModal
          Open={OpenDeleteModal}
          setOpen={setOpenDeleteModal}
          onSubmit={async () => {
            setLoading(true);
            try {
              const response = await DeleteUserApi(Selected._id);
              if (response.data.success) {
                SuccessToast(response.data.data.msg);
                setOpenDeleteModal(false);
                dispatch(fetchCustomers());
              }
            } catch (err) {
              console.log(err);
            }
            setLoading(false);
          }}
          Loading={Loading}
        />
      )}
      {OpenChangePasswordModal && (
        <ChangePasswordModal
          open={OpenChangePasswordModal}
          setOpen={setOpenChangePasswordModal}
          customer_id={Selected._id}
        />
      )}
    </div>
  );
};

export default UserManagement;
