import React from "react";
import { Box, Link, Typography } from "@mui/material";
import { CustomCheckbox, CustomTextField, LoginButton, LoginStyles } from "./loginSyle";
import Grid from '@mui/material/Grid2';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as yup from "yup"; // Import yup for schema validation
import logoIcon from "../../assets/logoIcon.png";
import apiClient from "../../Utils/apiClient";
import { setAuthData } from "../../Utils/authUtils";
import { useNavigate } from "react-router-dom";

// Interface for form data
interface loginForm {
    email: string;
    password: string;
}

// Validation schema using yup
const schema = yup.object().shape({
    email: yup.string().email("Invalid email address").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage: React.FC = () => {
    
    const navigate = useNavigate();
    //@ts-ignore
    const { control, handleSubmit, trigger,  formState: { errors,isValid  } } = useForm<loginForm>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(schema), // Add the resolver for validation
        mode: "onChange", // Enable real-time validation for isValid
    });

    const onSubmit: SubmitHandler<loginForm> = async(data) => {
        try {
            const response = await apiClient.post("/login", data);
            const { token, user } = response.data;
      
            setAuthData(token, user.userRole); // Save token and role in localStorage
            navigate("/dashboard"); // Redirect to dashboard
            //@ts-ignore
          } catch (error:{messsage:string}) {
            alert(error.message);
          }
    };

    return (
        <Grid container sx={LoginStyles.container}>
            {/* Left Section with Form */}
            <Grid size={{ xs: 12, md: 6 }} sx={LoginStyles.leftSection}>
                <Box sx={LoginStyles.formBox}>
                    {/* company logo */}
                    <div>
                        <img src={logoIcon} alt="Logo" style={{ width: "173px", height: "81px" }} />
                    </div>

                    <Typography sx={{ mb: 2, fontWeight: "bold", fontSize: "18px" }}>
                        Welcome to WowTech
                    </Typography>

                    {/* form start */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Email Field */}
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    fullWidth
                                    label="Email"
                                    type="text"
                                    variant="outlined"
                                    error={!!errors.email} // Highlight field on error
                                    helperText={errors.email?.message} // Display error message
                                    {...field}
                                />
                            )}
                        />

                        {/* Password Field */}
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    error={!!errors.password} // Highlight field on error
                                    helperText={errors.password?.message} // Display error message
                                    {...field}
                                />
                            )}
                        />

                        {/* Submit Button */}
                        <div style={{ marginBottom: '10px', textAlign: 'left' }}>
                            <Link href="#" sx={{ color: "#FF0000" }}>
                                Forgot Password?
                            </Link>

                        </div>

                        <LoginButton
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={!isValid} // Disable button if form is not valid
                        >
                            Login
                        </LoginButton>

                        <div style={{ display: "flex",alignItems: "center",marginTop: '10px',textAlign:'left' }}>

                            <CustomCheckbox color="primary" />
                            <Typography style={{ color: '#333333', fontSize: '12px', marginLeft: '6px' }}>Remember Password?</Typography>
                        </div>

                        <div style={{ display: "flex",alignItems: "center",marginTop: '10px',textAlign:'left' }}>
                            <Typography style={{ color: '#4D4C4C', fontSize: '16px' }}>
                                Don’t have an account? <Link style={{ color: '#000000', fontSize: '16px', fontWeight: '600' }} href="#">Get Started</Link>
                            </Typography>
                        </div>
                    </form>
                </Box>
            </Grid>

            {/* Right Section with Image */}
            <Grid size={{ xs: 12, md: 6 }} sx={LoginStyles.rightSection} />
        </Grid>
    );
};

export default LoginPage;
