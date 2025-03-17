import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import CustomTextField from "../../components/cutomComponents/CustomTextField";
import CustomButton from "../../components/cutomComponents/CustomButton";

const OffsetForm = () => {
  return (
    <Box>
       <Typography variant="h5" textAlign={'center'} mt={'1%'}>Offset Form Data</Typography>
      <Box
        sx={{
          width: "100%",
          marginTop: "1%",
          padding: "14px 11px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Experts WovVTech Email ID *</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter Email Id"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Project Name *</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter project Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Feature Name *</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter Feature Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Feature NameStory Link's</Typography>
            <Typography>
              (Please add links only by comma separated) *
            </Typography>
            <CustomTextField
              name="name"
              placeholder="Enter Feature Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Skill wise average time for given feature*</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter Feature Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Total Tracked Hours in the given feature *</Typography>
            <CustomTextField
              name="name"
              placeholder="Enter Feature Name"
              height="40px"
              padding="10px"
              width="406px"
              sx={{ backgroundColor: "#FFFFFF" }}
              //   value={formData.name}
              //   onChange={handleChange}
            />
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginTop: "10px" }}
          >
            <Typography>Reason why it's failing</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <RadioGroup
                name="reasonForFailing"
                value={""}
                // onChange={(e) => setFormdata({ ...formData, reasonForFailing: e.target.value })}
              >
                <FormControlLabel
                  value="NA"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="NA"
                />
                <FormControlLabel
                  value="Project / Feature Requirement"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Project / Feature Requirement"
                />
                <FormControlLabel
                  value="Backend Dependancy"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Backend Dependancy"
                />
                <FormControlLabel
                  value="Incomplete KT / Incomplete Details on the story ()"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Incomplete KT / Incomplete Details on the story ()"
                />
                <FormControlLabel
                  value="Other reason"
                  control={<Radio sx={{ color: "#ccc" }} />}
                  label="Other reason"
                />
              </RadioGroup>
            </Box>
          </Box>
          <CustomButton
            btnText="Submit"
            buttonVariant="contained"
            btnStyle={{ margin: "10px", width: "103px" }}
            buttonId="outlined-button"
            // handleButtonClick={handleAddEntry}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OffsetForm;
