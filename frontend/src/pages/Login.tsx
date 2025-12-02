import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Paper, InputAdornment, Alert, CircularProgress, Snackbar} from "@mui/material";
import bg from '../assets/bg.jpg';
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from '@mui/icons-material/Lock';
import { validateLogin } from "../schemas/validation";
import type { Gerente } from "../types/gerente";
import { login } from "../services/loginService";

const REDIRECT_DELAY = 2000;

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msgSucesso, setMsgSucesso] = useState<string>("");
  const [msgErro, setMsgErro] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
      setMsgErro("");
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const validation = validateLogin(formData);

      if (!validation.success) {
        setErrors(validation.errors);
        return;
      }

      setIsLoading(true);
      setMsgErro("");
      setMsgSucesso("");

      try {
        const gerente: Gerente = await login(
          formData.email,
          formData.senha
        );
        setMsgSucesso(`Bem-vindo(a), ${gerente.nome}!`);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        setTimeout(() => {
          setIsLoading(false);
          navigate("/home");
        }, REDIRECT_DELAY);

      } catch (error) {
        console.error("Erro no login:", error);
        setMsgErro("Erro ao realizar login. Verifique suas credenciais.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        setIsLoading(false);

      } 
    },
    [formData, navigate]
  );

  return (  
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
       backgroundImage: `url(${bg})`,
       minHeight: '100vh',
       backgroundSize: 'cover',
       backgroundPosition: 'center',
      }}
    >   

    <Snackbar 
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ 
            width: "100%",
            fontSize: "17px",
            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.75)',
            backgroundColor: 'rgba(144, 143, 143, 0.26)',
            color: "  ",
            borderRadius: 3,
          }}
        >
          {snackbarSeverity === "success" ? msgSucesso : msgErro}
        </Alert>
      </Snackbar>

    <Paper
      elevation={3}
      sx={{
        p: 4,
        margin: "normal",
        width: 420,
        borderRadius: 4,
        backgroundColor: "rgba(255, 255, 255, 0.42)",
        backdropFilter: "blur(4px)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.55)", 
      }}
    >
    <Box>
      <Typography
        variant="h3"
        component="h1"
        fontWeight={700}
        mb={2}
        sx={{ color: "rgba(0, 0, 0, 0.93)", textShadow: "0 6px 22px rgba(255, 255, 255, 1)" }}
      >
        Login
      </Typography>
    </Box>

    <Box component="form" noValidate onSubmit={handleSubmit}>

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        size="medium"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        disabled={isLoading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "18px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 22px rgba(0, 0, 0, 0.5)",
            fontSize: "18px",
            paddingRight: "12px",
            "&.Mui-focused fieldset": {
              borderColor: "#000000ff",
              borderWidth: "2px",
              boxShadow: "0 8px 22px rgba(255, 255, 255, 0.5)"
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "18px",
            fontWeight: 500,
            color: "#000000ff",
            "&.Mui-focused": {
              color: "#000000ff",
            }
          },
          "& .MuiInputBase-input": {
            fontSize: "18px",
            fontWeight: 500,
            color: "black",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
              <PersonIcon sx={{ color: "black" }} />
              </InputAdornment>
            ),
          },
        }} 
      />

      <TextField
        label="Senha"
        name="senha"
        type="password"
        fullWidth
        margin="normal"
        size="medium"
        value={formData.senha}
        onChange={handleInputChange}
        error={!!errors.senha}
        helperText={errors.senha}
        disabled={isLoading}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "18px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            boxShadow: "0 8px 22px rgba(0, 0, 0, 0.5)",
            fontSize: "18px",
            paddingRight: "12px",
            "&.Mui-focused fieldset": {
              borderColor: "#000000ff",
              borderWidth: "2px",
              boxShadow: "0 8px 22px rgba(255, 255, 255, 0.5)"
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "18px",
            fontWeight: 500,
            color: "#000000ff",
            "&.Mui-focused": {
              color: "#000000ff",
            }
          },
          "& .MuiInputBase-input": {
            fontSize: "18px",
            fontWeight: 500,
            color: "black",
          },
        }}
        slotProps={{
            input: {
            endAdornment: (
                <InputAdornment position="end">
                <LockIcon sx={{ color: "black" }} />
                </InputAdornment>
            ),
            },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          mt: 4,
          ml: 4,
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          color: "black",
          borderRadius: "999px",
          paddingY: "12px",
          textTransform: "none",
          fontSize: "16px",
          fontWeight: 600,
          boxShadow: "0 8px 22px  rgba(0, 0, 0, 0.4)",
          "&:hover": {
            backgroundColor: " rgba(0, 0, 0, 0.8)",
            color: 'white',
            boxShadow: "0 8px 22px rgba(255, 255, 255, 0.4)",
          },

        }}
      >
        {isLoading ? (
          <Box display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} color="inherit" />
            <span>Entrando...</span>
          </Box>
          ) : (
          "Entrar"
        )}
      </Button>
    </Box>
  </Paper>
</Box>

  );
};

export default Login;