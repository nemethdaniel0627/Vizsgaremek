import React from "react";
import { faFileExcel, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import XLSX from 'xlsx';
import { URL } from '../utils/constants.js';
import { styled } from '@mui/material/styles';
import { Alert, AlertTitle, TextField, Collapse, IconButton } from "@mui/material";
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

    // Design By
    // - https://dribbble.com/shots/13992184-File-Uploader-Drag-Drop    
    useEffect(() => {
        // Select Upload-Area
        const uploadArea = document.querySelector('#uploadArea')

        // Select Drop-Zoon Area
        const dropZoon = document.querySelector('#dropZoon');

        // Loading Text
        const loadingText = document.querySelector('#loadingText');

        // Slect File Input 
        const fileInput = document.querySelector('#fileInput');

        // Select Preview Image
        const previewImage = document.querySelector('#previewImage');

        // File-Details Area
        const fileDetails = document.querySelector('#fileDetails');

        // Uploaded File
        const uploadedFile = document.querySelector('#uploadedFile');

        // Uploaded File Info
        const uploadedFileInfo = document.querySelector('#uploadedFileInfo');

        // Uploaded File  Name
        const uploadedFileName = document.querySelector('.uploaded-file__name');

        // Uploaded File Counter        

        // ToolTip Data
        const toolTipData = document.querySelector('.upload-area__tooltip-data');

        // Images Types
        const fileTypes = [
            ".csv",
            "xls",
            "xlsx"
        ];

        // Append Images Types Array Inisde Tooltip Data
        toolTipData.innerHTML = [...fileTypes].join(', .');

        // When (drop-zoon) has (dragover) Event 
        dropZoon.addEventListener('dragover', function (event) {
            // Prevent Default Behavior 
            event.preventDefault();

            // Add className (drop-zoon--over) On (drop-zoon)
            dropZoon.classList.add('drop-zoon--over');
        });

        // When (drop-zoon) has (dragleave) Event 
        dropZoon.addEventListener('dragleave', function (event) {
            // Remove className (drop-zoon--over) from (drop-zoon)
            dropZoon.classList.remove('drop-zoon--over');
        });

        // When (drop-zoon) has (drop) Event 
        dropZoon.addEventListener('drop', function (event) {
            // Prevent Default Behavior 
            event.preventDefault();

            // Remove className (drop-zoon--over) from (drop-zoon)
            dropZoon.classList.remove('drop-zoon--over');

            // Select The Dropped File
            const file = event.dataTransfer.files[0];

            // Call Function uploadFile(), And Send To Her The Dropped File :)
            uploadFile(file);
        });

        // When (drop-zoon) has (click) Event 
        dropZoon.addEventListener('click', function (event) {
            // Click The (fileInput)
            fileInput.click();
            console.log("click");
        });

        // When (fileInput) has (change) Event 
        fileInput.addEventListener('change', function (event) {
            // Select The Chosen File
            const file = event.target.files[0];

            // Call Function uploadFile(), And Send To Her The Chosen File :)
            uploadFile(file);
        });

        // Upload File Function
        function uploadFile(file) {
            try {
                // File Type 
                const fileType = file.type;
                // File Size 
                const fileSize = file.size;

                if (fileValidate(fileType, fileSize)) {
                    // Add className (drop-zoon--Uploaded) on (drop-zoon)
                    dropZoon.classList.add('drop-zoon--Uploaded');

                    // Show Loading-text
                    loadingText.style.display = "block";
                    // Hide Preview Image
                    previewImage.style.display = 'none';

                    // Remove className (uploaded-file--open) From (uploadedFile)
                    uploadedFile.classList.remove('uploaded-file--open');
                    // Remove className (uploaded-file__info--active) from (uploadedFileInfo)
                    uploadedFileInfo.classList.remove('uploaded-file__info--active');

                    console.log(file);
                    Upload(file);
                    // Read (file) As Data Url 
                    // fileReader.readAsDataURL(file);

                } else { // Else
                    console.log("this");
                    return this;
                    // fileValidate(fileType, fileSize); // (this) Represent The fileValidate(fileType, fileSize) Function

                };
            } catch (error) {
            }
        };

        // Progress Counter Increase Function


        function Upload(file) {
            const reader = new FileReader();
            if (reader.readAsBinaryString) {
                reader.onload = (e) => {
                    processExcel(reader.result);
                    setTimeout(function () {
                        // Add className (upload-area--open) On (uploadArea)
                        uploadArea.classList.add('upload-area--open');

                        // Hide Loading-text (please-wait) Element
                        loadingText.style.display = "none";
                        // Show Preview Image
                        previewImage.style.display = 'block';

                        // Add className (file-details--open) On (fileDetails)
                        fileDetails.classList.add('file-details--open');
                        // Add className (uploaded-file--open) On (uploadedFile)
                        uploadedFile.classList.add('uploaded-file--open');
                        // Add className (uploaded-file__info--active) On (uploadedFileInfo)                        

                        // Add File Name Inside Uploaded File Name
                        uploadedFileName.innerHTML = file.name;

                        // Call Function progressMove();                        
                    }, 500); // 0.5s
                };
                reader.readAsBinaryString(file);
            }
        }

        function processExcel(data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const firstSheet = workbook.SheetNames[0];
            console.log(workbook.Sheets[firstSheet]);
            const excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
            setExcelRows(excelRows);
            console.log(excelRows);
        }

        // Simple File Validate Function
        function fileValidate(fileType, fileSize) {
            // File Type Validation
            let isGoodFormat = fileTypes.filter((type) => {
                return fileType.indexOf(`application/vnd.ms-excel`) !== -1 ? true : fileType.indexOf(`application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`) !== -1 && type === "xlsx" ? true : false;
                // return fileType.indexOf(`image/${type}`) !== -1;
            });

            // uploadedFileIconText.innerHTML = isGoodFormat[0];
            // If The Uploaded File Is An Image
            if (isGoodFormat.length !== 0) {
                // Check, If File Size Is 2MB or Less
                if (fileSize <= 2000000) { // 2MB :)
                    return true;
                } else { // Else File Size
                    return alert('A fájl méretének kisebbnek kell lenni mint 2MB');
                };
            } else { // Else File Type 
                return alert('Kérem jó formátumú fájl válasszon');
            };
        };

    }, [])

    function progressMove() {
        // Counter Start
        let counter = 0;
        const uploadedFileCounter = document.querySelector('.uploaded-file__counter');
        const uploadedFileInfo = document.querySelector('#uploadedFileInfo');
        if (uploadedFileInfo) {
            uploadedFileInfo.classList.add('uploaded-file__info--active');
        }

        // After 600ms 
        if (uploadedFileCounter) {
            setTimeout(() => {
                // Every 100ms
                let counterIncrease = setInterval(() => {
                    // If (counter) is equle 100 
                    if (counter === 100) {
                        // Stop (Counter Increase)
                        clearInterval(counterIncrease);
                    } else { // Else
                        // plus 10 on counter
                        counter = counter + 10;
                        // add (counter) vlaue inisde (uploadedFileCounter)
                        uploadedFileCounter.innerHTML = `${counter}%`
                    }
                }, 100);
            }, 600);
        }
    };

    function sendExcelRows() {
        const startDay = modules.getFirstDayOfWeek(week);
        console.log(startDay);
        axios.post(`${URL}/etlap`, {
            excelRows: excelRows,
            date: modules.convertDateWithDash(startDay)
        })
            .then((response) => {
                console.log(response);
                progressMove();
            })
            .catch((error) => {
                setErrorOpen(true);
                console.error(error);
            });
    }

    const [week, setWeek] = useState(new Date());
    const [errorOpen, setErrorOpen] = useState(false);

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

                        <button className="upload-area__button" onClick={sendExcelRows}>Étlap feltöltése</button>
                    </div>
                </div>
                {/* <!-- End File Details --> */}
            </div>
            {/* <!-- End Upload Area --></div> */}
            <div className="upload-area--error-message">
                <Collapse in={errorOpen}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="large"
                                onClick={() => {
                                    setErrorOpen(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </IconButton>
                        }
                        sx={{ mb: 2, fontSize: '1.2rem' }}
                    >
                        <AlertTitle sx={{ fontSize: '1.8rem' }}>Hiba</AlertTitle>
                        Hiba történt az étlap elküldésekor!<br />
                        Kérjük ellnőrizze a <strong>formátumot!</strong>
                    </Alert>
                </Collapse>
            </div>
        </div>
    )
}