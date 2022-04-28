import React from "react";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from 'xlsx';
import styled from '@mui/material/styles/styled';
import TextField from "@mui/material/TextField";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import locale from 'date-fns/locale/hu'
import modules from "../helpers/modules.js";
import ResponseMessage from "../components/ResponseMessage.jsx";
import AuthUser from "../modules/AuthUser.js";

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) =>
        prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})(({ theme, dayIsBetween, isFirstDay, isLastDay, outsideCurrentMonth }) => ({
    backgroundColor: "red",
    color: "#fff",
    ...(dayIsBetween && {
        borderRadius: 0,
        backgroundColor: "var(--dark-blue) !important",
        color: theme.palette.common.white,
        '&:hover, &:focus': {
            backgroundColor: "var(--blue) !important",
        },
    }),
    ...(isFirstDay && {
        borderTopLeftRadius: '50%',
        borderBottomLeftRadius: '50%',
    }),
    ...(isLastDay && {
        borderTopRightRadius: '50%',
        borderBottomRightRadius: '50%',
    }),
    ...(outsideCurrentMonth && {
        filter: "brightness(75%)"
    })
}));

export default function MenuUpload() {

    const [excelRows, setExcelRows] = useState();
    const [week, setWeek] = useState(new Date());
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertText, setAlertText] = useState("");
    const [alertButtons, setAlertButtons] = useState(false);


    useEffect(() => {
        const uploadArea = document.querySelector('#uploadArea')

        const dropZoon = document.querySelector('#dropZoon');

        const loadingText = document.querySelector('#loadingText');

        const fileInput = document.querySelector('#fileInput');

        const previewImage = document.querySelector('#previewImage');

        const fileDetails = document.querySelector('#fileDetails');

        const uploadedFile = document.querySelector('#uploadedFile');

        const uploadedFileInfo = document.querySelector('#uploadedFileInfo');

        const uploadedFileName = document.querySelector('.uploaded-file__name');


        const toolTipData = document.querySelector('.upload-area__tooltip-data');

        const fileTypes = [
            ".csv",
            "xls",
            "xlsx"
        ];

        toolTipData.innerHTML = [...fileTypes].join(', .');

        dropZoon.addEventListener('dragover', function (event) {
            event.preventDefault();

            dropZoon.classList.add('drop-zoon--over');
        });

        dropZoon.addEventListener('dragleave', function (event) {
            dropZoon.classList.remove('drop-zoon--over');
        });

        dropZoon.addEventListener('drop', function (event) {
            event.preventDefault();

            dropZoon.classList.remove('drop-zoon--over');

            const file = event.dataTransfer.files[0];

            uploadFile(file);
        });

        dropZoon.addEventListener('click', function (event) {
            fileInput.click();

        });

        fileInput.addEventListener('change', function (event) {
            const file = event.target.files[0];

            uploadFile(file);
        });

        function uploadFile(file) {
            try {
                const fileType = file.type;
                const fileSize = file.size;

                if (fileValidate(fileType, fileSize)) {
                    dropZoon.classList.add('drop-zoon--Uploaded');

                    loadingText.style.display = "block";
                    previewImage.style.display = 'none';

                    uploadedFile.classList.remove('uploaded-file--open');
                    uploadedFileInfo.classList.remove('uploaded-file__info--active');


                    Upload(file);

                } else {

                    return this;

                };
            } catch (error) {
            }
        };



        function Upload(file) {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e) => {
                    try {
                        processExcel(reader.result);
                        setTimeout(function () {
                            uploadArea.classList.add('upload-area--open');

                            loadingText.style.display = "none";
                            previewImage.style.display = 'block';

                            fileDetails.classList.add('file-details--open');
                            uploadedFile.classList.add('uploaded-file--open');

                            uploadedFileName.innerHTML = file.name;

                        }, 500);
                    } catch (error) {

                        uploadArea.classList.remove('upload-area--open');
                        fileDetails.classList.remove('file-details--open');
                        uploadedFile.classList.remove('uploaded-file--open');
                        loadingText.style.display = "none";
                        previewImage.style.display = 'none';
                        dropZoon.classList.remove('drop-zoon--Uploaded');
                    }
                };
                reader.readAsBinaryString(file);
            }
        }

        function processExcel(data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const firstSheet = workbook.SheetNames[0];

            const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
            let index = 0;
            excelRows.forEach(row => {
                if (row.__EMPTY !== undefined) index++;
            })
            if (index === 5) {
                setExcelRows(excelRows);
            }
            else {
                setAlertText("Hiba történt az étlap elküldésekor!\nKérjük ellnőrizze a formátumot!");
                setAlertOpen(true);
                setAlertButtons(false);

                throw new Error("Bad format");
            }

        }

        function fileValidate(fileType, fileSize) {
            let isGoodFormat = fileTypes.filter((type) => {
                return fileType.indexOf(`application/vnd.ms-excel`) !== -1 ? true : fileType.indexOf(`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`) !== -1 && type === "xlsx" ? true : false;
            });

            if (isGoodFormat.length !== 0) {
                if (fileSize <= 2000000) {
                    return true;
                } else {
                    return alert('A fájl méretének kisebbnek kell lenni mint 2MB');
                };
            } else {
                return alert('Kérem jó formátumú fájl válasszon');
            };
        };

    }, [])

    function progressMove() {
        let counter = 0;
        const uploadedFileCounter = document.querySelector('.uploaded-file__counter');
        const uploadedFileInfo = document.querySelector('#uploadedFileInfo');
        if (uploadedFileInfo) {
            uploadedFileInfo.classList.add('uploaded-file__info--active');
        }

        if (uploadedFileCounter) {
            setTimeout(() => {
                let counterIncrease = setInterval(() => {
                    if (counter === 100) {
                        clearInterval(counterIncrease);
                    } else {
                        counter = counter + 10;
                        uploadedFileCounter.innerHTML = `${counter}%`
                    }
                }, 100);
            }, 600);
        }
    };

    function responseClick() {
        sendExcelRows(true);
    }

    function sendExcelRows(isOverride) {
        const startDay = modules.getFirstDayOfWeek(week);

        const uploadedFileCounter = document.querySelector('.uploaded-file__counter');
        const uploadedFileInfo = document.querySelector('#uploadedFileInfo');
        if (uploadedFileInfo.classList.contains("uploaded-file__info--active")) {
            uploadedFileInfo.classList.remove('uploaded-file__info--active');
        }
        uploadedFileCounter.innerHTML = `0%`
        axios.put("/menu",
            {
                excelRows: excelRows,
                date: modules.convertDateWithDash(startDay),
                override: isOverride
            }, AuthUser.authHeader())
            .then((response) => {

                progressMove();
            })
            .catch((error) => {
                setAlertText("Hiba történt az étlap elküldésekor!\nErre a hétre már van étlap feltöltve.\n\nKivánja cserélni?");
                setAlertOpen(true);
                setAlertButtons(true);
                console.error(error);
            });
    }



    const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!week) {
            return <PickersDay {...pickersDayProps} />;
        }


        const start = startOfWeek(week, { weekStartsOn: 1 });
        const end = endOfWeek(week, { weekStartsOn: 1 });

        const dayIsBetween = isWithinInterval(date, { start, end });
        const isFirstDay = isSameDay(date, start);
        const isLastDay = isSameDay(date, end);

        return (
            <CustomPickersDay
                {...pickersDayProps}
                disableMargin
                dayIsBetween={dayIsBetween}
                isFirstDay={isFirstDay}
                isLastDay={isLastDay}
                sx={{
                    fontSize: "1.1rem",
                    backgroundColor: "var(--blue)"
                }}
            />
        );
    };


    return (
        <div className="upload--container">
            {/* < !--Upload Area -- > */}
            <div id="uploadArea" className="upload-area">
                {/* <!-- Header --> */}
                <div className="upload-area__header">
                    <h1 className="upload-area__title">Töltse fel az étlapot</h1>
                    <p className="upload-area__paragraph">
                        A fájlnak ilyen formátumúnak kell lennie
                        <strong className="upload-area__tooltip">
                            Mint
                            <span className="upload-area__tooltip-data"></span>{/*  <!-- Data Will be Comes From Js --> */}
                        </strong>
                    </p>
                </div>
                {/* <!-- End Header --> */}

                {/* <!-- Drop Zoon --> */}
                <div id="dropZoon" className="upload-area__drop-zoon drop-zoon">
                    <span className="drop-zoon__icon">
                        <FontAwesomeIcon icon={faFileExcel} />
                    </span>
                    <p className="drop-zoon__paragraph">Húzza be a fájlt vagy Kattintson tallózásért</p>
                    <span id="loadingText" className="drop-zoon__loading-text">Kérem várjon</span>
                    <FontAwesomeIcon id="previewImage" className="drop-zoon__preview-image" icon={faFileExcel} />
                    <input type="file" id="fileInput" className="drop-zoon__file-input" accept=".csv,.xls,.xlsx" />
                </div>
                {/* <!-- End Drop Zoon --> */}

                {/* <!-- File Details --> */}
                <div id="fileDetails" className="upload-area__file-details file-details">
                    <h3 className="file-details__title">Feltöltött fájl</h3>

                    <div id="uploadedFile" className="uploaded-file">
                        <div className="uploaded-file__icon-container">
                            <i className='bx bxs-file-blank uploaded-file__icon'></i>
                            <span className="uploaded-file__icon-text"></span>{/*  <!-- Data Will be Comes From Js --> */}
                        </div>

                        <div id="uploadedFileInfo" className="uploaded-file__info">
                            <span className="uploaded-file__name">Projekt 1</span>
                            <span className="uploaded-file__counter">0%</span>
                        </div>

                        <div className="week-selector">
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
                                <StaticDatePicker
                                    displayStaticWrapperAs="desktop"
                                    label="Week picker"
                                    value={week}
                                    onChange={(newValue) => {
                                        setWeek(newValue);
                                    }}
                                    showDaysOutsideCurrentMonth={true}
                                    renderDay={renderWeekPickerDay}
                                    renderInput={(params) => <TextField {...params} />}
                                    inputFormat="'Week of' MMM dd"
                                />
                            </LocalizationProvider>
                        </div>

                        <button className="upload-area__button" onClick={() => sendExcelRows(false)}>Étlap feltöltése</button>
                    </div>
                </div>
                {/* <!-- End File Details --> */}
            </div>
            {/* <!-- End Upload Area --></div> */}
            <ResponseMessage
                setAlertOpen={setAlertOpen}
                alertOpen={alertOpen}
                text={alertText}
                type="error"
                buttons={alertButtons}
                buttonClick={responseClick} />
        </div>
    )
}