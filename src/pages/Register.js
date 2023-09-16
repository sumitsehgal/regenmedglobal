import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { TextField, Button, Snackbar, MenuItem } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { states, countries, provinces, terms } from "../config";
import insertNewUser from "./insertNewUser";
 import insertErrorLog from "../functions/insertErrors";
import zxcvbn from "zxcvbn";
import { Select } from "antd";
import _ from "lodash"; // Import lodash
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: var(--main-color);
  padding: 20px;
`;
const StyledControllerContainer = styled.div`
  margin-bottom: 1rem;

  /* Added styles for positioning */
  position: relative;
  z-index: 0;

  /* Added styles for dropdown container */
  .country-dropdown-container {
    position: relative;
    z-index: 9999;
  }

  /* Added styles for dropdown menu */
  .react-dropdown-select-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 99999;
    margin-top: 4px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px; /* Set the maximum width for the form */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  text-align: center; /* Add this line to center the form */

  @media screen and (max-width: 768px) {
    padding: 20px; /* Adjust padding for mobile devices */
  }
`;



const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Register = () => {
  const conditionRef = React.useRef(null);
  const [showConditionsDropdown, setShowConditionsDropdown] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isStateDisabled, setIsStateDisabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState(""); // Add state for selected value
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      treatments: [], // Set initial value as an empty array
      conditions: [], // Set initial value as an empty array
      conditionsSuggestions: [], // Set initial value as an empty array
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add state for button disabled

  

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setIsStateDisabled(
      selectedCountry !== "United States" &&
        selectedCountry !== "Canada" &&
        selectedCountry !== "Mexico"
    );
    setSelectedCountry(selectedCountry);
  };


  // Function to set the error message
  const handleSetErrorMessage = (message) => {
    setErrorMessage(message);
  };
  const onSubmit = async (data, event) => {
    // Prevent the default form submission
    event.preventDefault();

    // Disable the button after the first click
    setIsButtonDisabled(true);

    try {
      const treatments = data.treatments.join(","); // Convert treatments array to string
      const conditions = data.conditions.join(","); // Convert conditions array to string
      const requestData = { ...data, treatments, conditions }; // Add treatments and conditions to the request data

      // Use omit to remove the "conditionsSelect" field from the request data
      const requestDataWithoutConditionsSelect = _.omit(
        requestData,
        "conditionsSelect"
      );

      console.log(
        "Request Body from front end:",
        JSON.stringify(requestDataWithoutConditionsSelect)
      );

      const response = await insertNewUser(requestDataWithoutConditionsSelect);

      // Check the response for success or failure
      if (response.message === "Data inserted successfully") {
        // Data inserted successfully
        reset(); // Reset the form fields
        toast.success("Registration Successful. Thank you for signing up!");
      } else {
        // Data insertion failed
        toast.error("Registration Failed. Please try again.");
      }
    } catch (catchError) {
         // Insert the error into the error_log table
       insertErrorLog(catchError, data.email)
      console.error("Error inserting data:", catchError);
  
      // Check for specific error types and display corresponding error messages
      if (catchError.name === "EmailExistingError") {
        toast.error("Email already in use. Please choose a different email address.");
      } else if (catchError.name === "LocationError") {
        toast.error("Invalid location. Please provide a valid city, state, and country.");
      } else {
        toast.error("Registration Failed. Please try again.");
      }
    } finally {
      // Re-enable the button after the form submission is complete
      setIsButtonDisabled(false);
    }
  };
  



  const handleTreatmentSelection = (
    selectedTreatments,
    treatmentType,
    field
  ) => {
    console.log("Selected Treatments before:", selectedTreatments);

    let updatedTreatments = [...selectedTreatments];

    // Check if the treatment type is already selected
    const treatmentIndex = updatedTreatments.indexOf(treatmentType);

    if (treatmentIndex > -1) {
      // Treatment is already selected, remove it
      updatedTreatments.splice(treatmentIndex, 1);
      console.log("Removed Treatment:", treatmentType);
    } else {
      // Treatment is not selected, add it
      updatedTreatments.push(treatmentType);
      console.log("Added Treatment:", treatmentType);
    }

    console.log("Updated Treatments:", updatedTreatments);

    // Update the field value
    field.onChange(updatedTreatments);
  };

  const password = watch("password");

  const getPasswordStrength = () => {
    if (!password) {
      return "";
    }

    const { score } = zxcvbn(password);
    const strengthLabels = [
      "Very Weak",
      "Weak",
      "Fair",
      "Strong",
      "Very Strong",
    ];

    return strengthLabels[score];
  };

  const isPasswordStrongEnough = () => {
    const { score } = zxcvbn(password);
    return score >= 2; // Minimum score of 2 corresponds to "Fair" strength
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleConditionSelect = (selectedOption) => {
    console.log("Selected Conditions:", selectedOption);
    const conditionsLoweredCased = watch("conditions").map((option) =>
      option.toLowerCase()
    );

    if (!conditionsLoweredCased.includes(selectedOption.toLowerCase())) {
      setValue("conditions", watch("conditions").concat(selectedOption));
    }
    setValue("conditionsSuggestions", []);
    setShowConditionsDropdown(false);
  };

  return (
    <Container>
      <FormContainer>
         {/* Add ToastContainer at the top-level of the component */}
         <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Title>Sign Up</Title>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
          {/* Form fields */}
          <StyledControllerContainer>
            <Controller
              name="clinicName"
              control={control}
              defaultValue=""
              rules={{ required: "Clinic Name is required" }}
              render={({ field }) => (
                <TextField
                  label="Clinic Name"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.clinicName)}
                  helperText={
                    errors.clinicName ? errors.clinicName.message : ""
                  }
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    console.log("Clinic values:", e.target.value);
                  }}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer
            onMouseEnter={() => setShowConditionsDropdown(true)}
            onMouseLeave={() => setShowConditionsDropdown(false)}
          >
            <Controller
              name="conditionsSuggestions"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    mode="tags"
                    ref={conditionRef}
                    open={showConditionsDropdown}
                    style={{ width: "25rem", marginTop: "1rem" }}
                    placeholder="Select Your Conditions/Diseases treated"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onSelect={handleConditionSelect}
                    value={watch("conditionsSuggestions")}
                    options={terms.map((term) => ({ value: term }))}
                  />
                </div>
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="conditions"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    mode="multiple"
                    open={false}
                    style={{ width: "25rem", marginTop: "1rem" }}
                    placeholder="Conditions/Diseases treated"
                    {...field}
                    options={[]} // Set options to an empty array to disable any suggestions

          
                    // options={terms.map((term) => ({ value: term }))}
                  />
                </div>
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="treatments"
              control={control}
              defaultValue={[]}
              rules={{
                required: "At least one Treatment Type must be selected",
              }}
              render={({ field }) => (
                <div>
                  <label>Treatments</label>
                  <div>
                    <Button
                      variant={
                        field.value.includes("PRP") ? "contained" : "outlined"
                      }
                      color="primary"
                      onClick={() =>
                        handleTreatmentSelection(field.value, "PRP", field)
                      }
                    >
                      PRP
                    </Button>
                    <Button
                      variant={
                        field.value.includes("Stem Cell")
                          ? "contained"
                          : "outlined"
                      }
                      color="primary"
                      onClick={() =>
                        handleTreatmentSelection(
                          field.value,
                          "Stem Cell",
                          field
                        )
                      }
                    >
                      Stem Cell Therapy
                    </Button>
                    <Button
                      variant={
                        field.value.includes("Prolotherapy")
                          ? "contained"
                          : "outlined"
                      }
                      color="primary"
                      onClick={() =>
                        handleTreatmentSelection(
                          field.value,
                          "Prolotherapy",
                          field
                        )
                      }
                    >
                      Prolotherapy
                    </Button>
                  </div>
                  {/* Add more buttons for different treatments */}
                </div>
              )}
            />
            {errors.treatments && <p>{errors.treatments.message}</p>}
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <TextField
                  label="Address"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.address)}
                  helperText={errors.address ? errors.address.message : ""}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    console.log("Address values:", e.target.value);
                  }}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <TextField
                  label="Country"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.country)}
                  helperText={errors.country ? errors.country.message : ""}
                  select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    handleCountryChange(e); // Call the handleCountryChange function
                  }}
                  SelectProps={{
                    MenuProps: {
                      PaperProps: {
                        style: {
                          maxHeight: "30vh",
                        },
                      },
                    },
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{
                required:
                  selectedCountry === "United States" ||
                  selectedCountry === "Mexico" ||
                  selectedCountry === "Canada"
                    ? "State is required"
                    : undefined, // Set the rule to undefined if state is not required
              }}
              render={({ field }) => (
                <TextField
                  label="State"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.state)}
                  helperText={errors.state ? errors.state.message : ""}
                  select
                  disabled={isStateDisabled} // Set the disabled state based on isStateDisabled
                  {...field}
                >
                  {selectedCountry === "Canada"
                    ? provinces.map((province) => (
                        <MenuItem key={province} value={province}>
                          {province}
                        </MenuItem>
                      ))
                    : states.map((state) => (
                        <MenuItem key={state} value={state}>
                          {state}
                        </MenuItem>
                      ))}
                </TextField>
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: "City is required" }}
              render={({ field }) => (
                <TextField
                  label="City"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.city)}
                  helperText={errors.city ? errors.city.message : ""}
                  {...field}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: "Phone is required",
                pattern: {
                  value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                  message: "Invalid phone number format",
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Phone"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone ? errors.phone.message : ""}
                  {...field}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="website"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Website"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  rules={{
                    pattern: {
                      value: /^(ftp|http|https):\/\/[^ "]+$/,
                      message: "Invalid website URL",
                    },
                  }}
                  error={Boolean(errors.website)}
                  helperText={errors.website ? errors.website.message : ""}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    console.log("Website values:", e.target.value);
                  }}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    label="Email"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ""}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      console.log("Email values:", e.target.value);
                    }}
                  />
                </>
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="confirmEmail"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Email is required",
                validate: (value) =>
                  value === getValues("email") ||
                  "Email and Confirm Email must match",
              }}
              render={({ field }) => (
                <TextField
                  label="Confirm Email"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  fullWidth
                  error={Boolean(errors.confirmEmail)}
                  helperText={
                    errors.confirmEmail ? errors.confirmEmail.message : ""
                  }
                  {...field}
                />
              )}
            />
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                validate: {
                  strongEnough: (value) =>
                    isPasswordStrongEnough(value) ||
                    'Password must be at least "Fair" strength',
                },
              }}
              render={({ field }) => (
                <TextField
                  label="Password"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  error={Boolean(errors.password)}
                  helperText={errors.password ? errors.password.message : ""}
                  {...field}
                  type="password"
                  onChange={(e) => {
                    field.onChange(e);
                    console.log("Password values:", e.target.value);
                  }}
                />
              )}
            />
            <p>Password Strength: {getPasswordStrength()}</p>
          </StyledControllerContainer>

          <StyledControllerContainer>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Confirm Password is required",
                validate: (value) =>
                  value === getValues("password") ||
                  "Password and Confirm Password must match",
              }}
              render={({ field }) => (
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  style={{ width: "25rem" }}
                  fullWidth
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                  {...field}
                  type="password"
                />
              )}
            />
          </StyledControllerContainer>

          <div>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </div>
        </form>

      </FormContainer>
    </Container>
  );
};

export default Register;
