import { CiSearch } from "react-icons/ci";
import { MdAddHomeWork } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { GrClose } from "react-icons/gr";

import axios from "axios";
import { useEffect, useState } from "react";

function Appartement() {
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [appartements, setAppartements] = useState({});
    const [type, setType] = useState("");

    const [field, setField] = useState(false);

    const openField = (value) => {
        setField(true);
        setType(value);
    };
    const closeField = () => {
        setField(false);
    };

    const clearForm = () => {
        setAppartement({
            numApp: "",
            design: "",
            loyer: "",
        });
        closeField();
    };

    const [appartement, setAppartement] = useState({
        numApp: "",
        design: "",
        loyer: "",
    });

    const [loyer, setLoyer] = useState({});

    const [selectedAppartement, setSelectedAppartement] = useState(null);

    const handleAppartementClick = (appartement) => {
        setSelectedAppartement(appartement);
    };

    const idApp = () => {
        if (selectedAppartement) {
            console.log(selectedAppartement._id);
        }
    };

    const getAppartement = () => {
        setLoading(true);
        axios
            .get(`http://localhost:6009/api/appartements`)
            .then(({ data }) => {
                setLoading(false);
                setAppartements(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getLoyer = () => {
        setLoading(true);
        axios
            .get(`http://localhost:6009/api/loyers`)
            .then(({ data }) => {
                setLoading(false);
                setLoyer(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        axios
            .post(`http://localhost:6009/api/create`, {
                numApp: appartement.numApp,
                design: appartement.design,
                loyer: appartement.loyer,
            })
            .then(() => {
                alert("Le projet a été créé avec succès");
                getAppartement();
                getLoyer();
                clearForm();
            })
            .catch((err) => {
                if (err.response && err.response.status === 422) {
                    alert(err.response.data.errors.message);
                } else {
                    alert({ general: "Une erreur s'est produite." });
                }
            });
    };

    useEffect(() => {
        getAppartement();
        getLoyer();
    }, []);

    return (
        <>
            <div className="pl-6 pt-6 flex justify-between">
                <div className="bg-[#ffffff] w-[65%] rounded-xl mr-5">
                    <header className="mt-6 flex items-center justify-between flex-wrap p-4">
                        <div className="flex items-center flex-shrink-0 mr-6">
                            <span className="font-semibold text-xl tracking-tight">
                                Table Appartement
                            </span>
                        </div>

                        <div className="text-sm lg:flex-grow flex justify-end">
                            <div className="flex">
                                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-[#dbdbdb] p-5">
                                    <CiSearch
                                        className="pointer-events-none absolute fill-gray-500 transition"
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                </div>
                                <input
                                    type="text"
                                    className="w-full max-w-[160px] bg-[#f8f8f8] pl-2 text-base font-semibold outline-0"
                                    placeholder=""
                                    id=""
                                />
                                <input
                                    type="button"
                                    value="recherche"
                                    className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                                />
                            </div>
                            <button
                                onClick={() => openField("create")}
                                data-modal-target="default-modal"
                                data-modal-toggle="default-modal"
                                className="ml-5 cursor-pointer group relative items-center flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-2xl hover:bg-opacity-70 transition font-semibold shadow-md"
                            >
                                <MdAddHomeWork
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                    }}
                                />
                                <span>Nouvelle Appartement</span>
                            </button>
                        </div>
                    </header>
                    {/*  LIST APPARTEMENT */}
                    <div className="mt-6">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                                <thead className="text-sm text-gray-700 uppercase bg-[#dfdfdf]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            number of apartment
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            design
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            rent
                                        </th>
                                        <th scope="col" className="text-center">
                                            <button>
                                                <MdDelete
                                                    style={{
                                                        width: "24px",
                                                        height: "24px",
                                                        color: "#D3D3D3",
                                                        cursor: "default",
                                                    }}
                                                />
                                                {/* FF0000 */}
                                            </button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {appartements && appartements.length > 0
                                        ? appartements.map((item, index) => (
                                              <tr
                                                  key={index}
                                                  className="bg-white"
                                                  onClick={() =>
                                                      handleAppartementClick(
                                                          item
                                                      )
                                                  }
                                              >
                                                  <th
                                                      scope="row"
                                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                  >
                                                      {item.numApp}
                                                  </th>
                                                  <td className="px-6 py-4">
                                                      {item.design}
                                                  </td>
                                                  <td className="px-6 py-4">
                                                      {item.loyer}
                                                  </td>
                                                  <td className="text-center">
                                                      <button
                                                          className="h-10 w-10 hover:bg-[#afafaf]"
                                                          //onClick={idApp}
                                                          onClick={() =>
                                                              openField(
                                                                  "create"
                                                              )
                                                          }
                                                      >
                                                          <MdModeEdit
                                                              style={{
                                                                  width: "24px",
                                                                  height: "24px",
                                                              }}
                                                          />
                                                      </button>
                                                  </td>
                                              </tr>
                                          ))
                                        : null}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="px-6 py-4">
                                            Loyer total: {loyer.totalLoyer}
                                        </td>
                                        <td className="px-6 py-4">
                                            Loyer minimal: {loyer.minLoyer}
                                        </td>
                                        <td className="px-6 py-4">
                                            Loyer maximal: {loyer.maxLoyer}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="h-2 bg-[#f3f3f3]"></div>
                            <div className="flex items-center justify-end flex-wrap mt-3 py-4 px-6">
                                <div className="flex items-center flex-shrink-0 mr-6">
                                    Page 1 of 10
                                </div>
                                <div className="text-sm lg:flex-grow flex justify-end">
                                    <button className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Prev
                                    </button>
                                    <button className="mr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        field
                            ? "bg-[#ffffff] w-[25%] rounded-xl mt-4 ease-in-out duration-500 h-[450px]"
                            : "top-[100%]"
                    }
                >
                    <div className={field ? "" : "hidden"}>
                        <div className="mt-6 flex items-center justify-between flex-wrap p-4">
                            <span className="font-semibold text-xl tracking-tight">
                                {type === "create"
                                    ? "New apartment"
                                    : "Edit an apartment"}
                            </span>
                            <button onClick={closeField}>
                                <GrClose />
                            </button>
                        </div>
                        <div className="h-2 bg-[#f3f3f3]"></div>
                        <div className="px-4 mt-5 w-[70%] m-auto">
                            <div className="mb-4">
                                <label
                                    className="text-left block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="numApp"
                                >
                                    Number of apartment
                                </label>
                                <input
                                    className="w-[100%] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="numApp"
                                    name="numApp"
                                    value={appartement.numApp}
                                    onChange={(event) =>
                                        setAppartement({
                                            ...appartement,
                                            numApp: event.target.value,
                                        })
                                    }
                                    type="text"
                                    placeholder="number of apartment"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="design"
                                >
                                    Design
                                </label>
                                <input
                                    className="w-[100%] shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="design"
                                    type="text"
                                    placeholder="Design"
                                    name="design"
                                    value={appartement.design}
                                    onChange={(event) =>
                                        setAppartement({
                                            ...appartement,
                                            design: event.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="rent"
                                >
                                    Rent
                                </label>
                                <input
                                    className="shadow w-[100%] appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="rent"
                                    type="number"
                                    min={0}
                                    placeholder="Rent"
                                    name="loyer"
                                    value={appartement.loyer}
                                    onChange={(event) =>
                                        setAppartement({
                                            ...appartement,
                                            loyer: event.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="h-2 bg-[#f3f3f3]"></div>
                        <form
                            onSubmit={handleSubmit}
                            className="py-5 flex items-center justify-between flex-wrap px-[50px]"
                        >
                            <button onClick={clearForm}>cancel</button>
                            <button>submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Appartement;
