import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Email, LocationOn, Person, Phone } from "@mui/icons-material";
import { styled } from "@mui/system";
import UserProfileTabs from "./UserProfileTabs";

const ProfileCard = styled(Paper)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4),
  marginTop: theme.spacing(12),
  borderRadius: theme.shape.borderRadius,
  transition: "all 0.3s ease",
}));

const UserProfile = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box my={4}>
        <UserProfileTabs />
      </Box>
      <Container maxWidth="md">
        <ProfileCard elevation={2}>
          {/* Cover Photo Area */}
          <Box
            sx={{
              height: 150,
              backgroundColor: "#888888",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
            }}
          />

          {/* Profile Content */}
          <Box position="relative" zIndex={1}>
            {/* Avatar Section */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                top: theme.spacing(-8),
              }}
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  border: `4px solid ${theme.palette.background.paper}`,
                  boxShadow: theme.shadows[3],
                }}
                src="https://example.com/user-image.jpg"
              />
            </Box>

            {/* User Info Section */}
            <Grid container spacing={4} justifyContent="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" gutterBottom>
                    John Doe
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    Senior Software Developer
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Person
                          sx={{
                            marginRight: 1,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="body1">@johndoe</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Email
                          sx={{
                            marginRight: 1,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="body1">
                          john.doe@example.com
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }} justifyContent={"center"}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Box display="flex" alignItems="center" mb={2}>
                        <Phone
                          sx={{
                            marginRight: 1,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="body1">+1 234 567 890</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" mb={2}>
                        <LocationOn
                          sx={{
                            marginRight: 1,
                            color: theme.palette.primary.main,
                          }}
                        />
                        <Typography variant="body1">New York, USA</Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>

                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{
                    textAlign: "center",
                    mt: 2,
                    px: { xs: 2, md: 4 },
                  }}
                >
                  Passionate developer with 8+ years of experience in building
                  scalable web applications. Specialized in React and Node.js
                  ecosystems.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </ProfileCard>
      </Container>
    </Box>
  );
};

export default UserProfile;
