import React, { useEffect, useState } from "react";
import Chips from "../components/Chips";
import modules from "../helpers/modules";
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';
import makeStyles from "@mui/styles/makeStyles";
import locale from 'date-fns/locale/hu'

export default function DateSelector(props) {
  let isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }

  const [justOneDay, setJustOneDay] = useState(false);
  const [startInputValue, setStartInputValue] = useState(null);
  const [endInputValue, setEndInputValue] = useState(null);
  const [selectedDates, setSelectedDates] = useState([]);

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            fontSize: "1.6rem",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "1.6rem"
          },
        }
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--dateRangeBackground)",
            ":hover": {
              backgroundColor: "var(--dateRangeBackground)",
            },
            "&.Mui-focused": {
              backgroundColor: "var(--dateRangeBackground)",
            },
          },

          input: {
            fontSize: "1.6rem",
            width: "40rem",
          },
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontSize: "1.2rem !important"
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: "2rem"
          }
        }
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            textTransform: "capitalize"
          },
          subtitle1: {
            fontSize: "1.2rem"
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            textTransform: "capitalize"
          }
        }
      }
    }
  });

  const useStyles = makeStyles(theme => ({
    calendar: {
      backgroundColor: "var(--dateRangeBackground)",
    },
  }), { index: 1 });

  const classes = useStyles();

  function justOneDayChange() {
    setJustOneDay(!justOneDay);
    setStartInputValue(null);
    setEndInputValue(null);
    if (startInputValue) {
      showSelectedDate(true);
      setStartInputValue("");
    }
  }

  function sameDateCheck() {
    let hasInterval = false;
    let returnValue;
    selectedDates.forEach(date => {
      if (date.includes("-")) hasInterval = true;
    })
    if (hasInterval) {
      let addDate = undefined;
      selectedDates.sort().some((date, index) => {

        if (date.includes("-")) {
          if (endInputValue && endInputValue !== startInputValue) {
            const tmpStart = date.toString().split("-")[0].trim();
            const tmpEnd = date.toString().split("-")[1].trim();
            if (
              modules.convertDateWithDash(new Date(tmpStart)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = true;
            }
            else if (
              modules.convertDateWithDash(new Date(tmpStart)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) >= modules.convertDateWithDash(new Date(endInputValue)) &&
              modules.convertDateWithDash(new Date(tmpStart)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${tmpEnd}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = true;
            }
            else if (
              modules.convertDateWithDash(new Date(tmpStart)) <= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) <= modules.convertDateWithDash(new Date(endInputValue)) &&
              modules.convertDateWithDash(new Date(tmpEnd)) >= modules.convertDateWithDash(new Date(startInputValue))
            ) {
              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${tmpStart} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = true;
            }
            else {
              returnValue = false;
            }
          }
          else {
            const tmpStart = date.toString().split("-")[0].trim();

            const tmpEnd = date.toString().split("-")[1].trim();


            if (modules.convertDateWithDash(new Date(tmpEnd)) === modules.convertDateWithDash(new Date(startInputValue))
              || modules.convertDateWithDash(new Date(startInputValue)) === modules.convertDateWithDash(new Date(tmpStart))) {
              returnValue = true;
              addDate = false;
            }
            else if (modules.convertDateWithDash(new Date(tmpStart)) > modules.convertDateWithDash(new Date(startInputValue))
              || modules.convertDateWithDash(new Date(tmpEnd)) < modules.convertDateWithDash(new Date(startInputValue))) {

              addDate = true;
              returnValue = true;
            }
            else {
              addDate = false;
              returnValue = true;
            }
          }
        }

        return addDate === false;
      })
      if (addDate) {
        setSelectedDates((prevDates) => {
          return [...prevDates, startInputValue.replaceAll("-", ".")];
        });
      }
    }
    else if (selectedDates.includes(startInputValue.replaceAll("-", "."))) {
      returnValue = true;
    }
    else {
      if (selectedDates.length !== 0) {
        selectedDates.sort().forEach((date, index) => {

          if (endInputValue) {
            if (
              modules.convertDateWithDash(new Date(date)) >= modules.convertDateWithDash(new Date(startInputValue)) &&
              modules.convertDateWithDash(new Date(date)) <= modules.convertDateWithDash(new Date(endInputValue))
            ) {

              const tmpSelectedDates = selectedDates;
              tmpSelectedDates.splice(index, 1);
              const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
              tmpSelectedDates.push(dateInterval);
              setSelectedDates(tmpSelectedDates);
              returnValue = false;
            }
            else returnValue = true;
          }
          else {

            returnValue = false;

          }
        });
      }
      else returnValue = false;
    }
    return returnValue;
  }

  function showSelectedDate(manuJustOneDay = null) {
    if (justOneDay || manuJustOneDay === true) {
      if (props.disabledDays.includes(startInputValue) || new Date(startInputValue) < new Date(props.disabledDays[0])) {
        props.errorMessage();
      }
      else {
        const sameDate = sameDateCheck();
        if ((!selectedDates.includes(startInputValue.replaceAll("-", ".")) && !sameDate))
          setSelectedDates((prevDates) => {
            return [...prevDates, startInputValue.replaceAll("-", ".")];
          });
      }

    }
    else if (startInputValue === endInputValue) {
      const sameDate = sameDateCheck();

      if (props.disabledDays.includes(startInputValue) || new Date(startInputValue) < new Date(props.disabledDays[0])) {
        props.errorMessage();
      }
      else if (!sameDate)
        setSelectedDates((prevDates) => {
          return [...prevDates, startInputValue.replaceAll("-", ".")];
        });
    }
    else {
      const sameDate = sameDateCheck();



      const dateInterval = `${startInputValue.replaceAll("-", ".")} - ${endInputValue.replaceAll("-", ".")}`;
      if (props.disabledDays.includes(startInputValue) || new Date(startInputValue) < new Date(props.disabledDays[0])) {
        props.errorMessage();
      }
      else if ((!selectedDates.includes(dateInterval) && !sameDate))
        setSelectedDates((prevDates) => {
          return [...prevDates, dateInterval];
        });
    }
  }

  function closeDate(index) {
    setSelectedDates((prevDates) => {
      if (index > -1) {
        prevDates.splice(index, 1);
      }
      return [...prevDates];
    });
  }

  useEffect(() => {
    if (justOneDay && startInputValue !== null) {
      showSelectedDate();
      setStartInputValue(null);
    }
    else if (startInputValue !== null && endInputValue !== null) {
      showSelectedDate();
      setStartInputValue(null);
      setEndInputValue(null);

    }
    props.getDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startInputValue])

  useEffect(() => {
    if (startInputValue !== null && endInputValue !== null && isMobile === false) {
      showSelectedDate();
      setStartInputValue(null);
      setEndInputValue(null);
    }
    props.getDates(selectedDates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endInputValue])

  return (
    <div className="date-selector">
      <div className="row w-100">
        <div className="col-sm-12 col-lg-12 mb-5 w-100 mt-2 date-selector--col">
          <h2 className="menu--header">Lemond??s</h2>
        </div>
        {
          selectedDates.sort().map((date, index) => {
            return <Chips key={`selectedDate-${index}`} removeIndex={index} date={date} closeDate={closeDate} />
          })
        }
        {/* <DateSelectorInput
          justOneDayOnChange={justOneDayChange}
          justOneDayValue={justOneDay}
          disabled={justOneDay}
          inputChange={dateInputChange}
          startInputValue={startInputValue}
          endInputValue={endInputValue} /> */}
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
          <ThemeProvider theme={theme}>
            {justOneDay === false ?
              <DateRangePicker
                autoFocus={true}
                startText="Ett??l"
                endText="Eddig"
                toolbarTitle="Lemond??s d??tum intervalluma"
                onClose={() => {
                  setStartInputValue(null);
                }}
                value={[startInputValue, endInputValue]}
                className={classes.calendar}
                onChange={(newValue) => {
                  if (isMobile === false) {
                    const tmpStart = newValue[0] !== null ? modules.convertDateWithDash(new Date(newValue[0])) : null;
                    const tmpEnd = newValue[1] !== null ? modules.convertDateWithDash(new Date(newValue[1])) : null;

                    setStartInputValue(tmpStart);
                    setEndInputValue(tmpEnd);
                  }
                }}
                onAccept={(newValue) => {
                  if (isMobile === true) {

                    const tmpStart = newValue[0] !== null ? modules.convertDateWithDash(new Date(newValue[0])) : null;
                    const tmpEnd = newValue[1] !== null ? modules.convertDateWithDash(new Date(newValue[1])) : null;

                    setStartInputValue(tmpStart);
                    setEndInputValue(tmpEnd);
                  }
                }}
                disableCloseOnSelect={true}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <div className="lunch-cncl--input-container">
                      <TextField variant="filled" {...startProps} />
                      <Box sx={{ mx: 2 }}></Box>
                      <TextField variant="filled" {...endProps} />
                    </div>
                    <div className="lunch-cncl--checkbox">
                      <input onChange={justOneDayChange} value={justOneDay} checked={justOneDay} type="checkbox" name="JustOneDay" id="JustOneDay" className="form-check-input me-2" />
                      <label htmlFor="JustOneDay">
                        Csak egy nap!
                      </label>
                    </div>
                  </React.Fragment>

                )}
              /> :
              <DatePicker
                autoFocus={true}
                label="Lemond??s d??tuma"
                value={startInputValue}
                toolbarTitle="Lemond??s d??tum kiv??laszt??sa"
                onChange={(newValue2) => {
                  if (isMobile === false) {
                    setStartInputValue(modules.convertDateWithDash(newValue2));
                  }
                }}
                onAccept={(newValue2) => {
                  if (isMobile === true) {

                    setStartInputValue(modules.convertDateWithDash(newValue2));
                  }
                }}
                disableCloseOnSelect={true}
                renderInput={(params) => (
                  <React.Fragment>
                    <div className="lunch-cncl--input-container">
                      <TextField variant="filled" {...params} />
                    </div>
                    <div className="lunch-cncl--checkbox">
                      <input onChange={justOneDayChange} value={justOneDay} checked={justOneDay} type="checkbox" name="JustOneDay" id="JustOneDay" className="form-check-input me-2" />
                      <label htmlFor="JustOneDay">
                        Csak egy nap!
                      </label>
                    </div>
                  </React.Fragment>
                )}
              />}
          </ThemeProvider>
        </LocalizationProvider>
      </div>
    </div>
  )
}