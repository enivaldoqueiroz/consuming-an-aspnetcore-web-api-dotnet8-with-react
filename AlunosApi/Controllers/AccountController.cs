using AlunosApi.Services;
using AlunosApi.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AlunosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthenticateService _authenticateService;
        private readonly UserManager<IdentityUser> _userManager;

        public AccountController(IConfiguration configuration, IAuthenticateService authenticateService, UserManager<IdentityUser> userManager)
        {
            _configuration = configuration;
            _authenticateService = authenticateService;
            _userManager = userManager;
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<UserToken>> CreateUser([FromBody] RegisterModel model)
        {
            if (model.Password != model.ConfirmPassword)
            {
                ModelState.AddModelError("ConfirmePassword", "As senhas não conferem");
                return BadRequest(ModelState);
            }

            var result = await _authenticateService.RegisterUser(model.Email, model.Password);

            if (result)
                return Ok($"Usuário {model.Email} criado com sucesso");
            else
                ModelState.AddModelError("CreateUser", "Registro inválido");
                return BadRequest(ModelState);
        }

        [HttpPost("LoginUser")]
        public async Task<ActionResult<UserToken>> LoginUser([FromBody] LoginModel userInfoModel)
        {
            var result = await _authenticateService.Authenticate(userInfoModel.Email, userInfoModel.Password);

            if (result)
                return GenerateToken(userInfoModel);
            else
            {
                ModelState.AddModelError("LoginUser", "Login inválido");
                return BadRequest(ModelState);
            }
        }

        private ActionResult<UserToken> GenerateToken(LoginModel userInfoModel)
        {
            //Define declarações do usuario
            var claims = new[]
            {
                new Claim("emial", userInfoModel.Email),
                new Claim("Setling", "Setling_SA"),
                new Claim("PerfilDeAcesso", "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //Gera uma chave com base em um algoritmo simetrico
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));

            //Gera a assinatura digital do token usando o algoritmo HMAC e a chave privada
            var credenciais = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //Tempo de expiracao do token
            #region Tempo de expiracao do token
            //var expiracao = _configuration["TokenConfiguration:ExpireHours"];//Outra forma pegando o tempo no appsettings.json
            //var expiration = DateTime.UtcNow.AddHours(double.Parse(expiracao));
            // Adiciona a quantidade de anos especificada à data e hora atual
            //var expirationYears = DateTime.UtcNow.AddYears(double.Parse(expiracao));

            // Adiciona a quantidade de dias especificada à data e hora atual
            //var expirationDays = DateTime.UtcNow.AddDays(double.Parse(expiracao));

            // Adiciona a quantidade de horas especificada à data e hora atual
            //var expirationHours = DateTime.UtcNow.AddHours(double.Parse(expiracao));

            // Adiciona a quantidade de minutos especificada à data e hora atual
            //var expirationMinutes = DateTime.UtcNow.AddMinutes(double.Parse(expiracao));

            // Adiciona a quantidade de milissegundos especificada à data e hora atual
            //var expirationMilliseconds = DateTime.UtcNow.AddMilliseconds(double.Parse(expiracao));

            // Adicionar microssegundos diretamente não é suportado nativamente em C#
            // Essa linha é fictícia, você precisaria implementar uma solução personalizada ou usar métodos existentes para lidar com microssegundos
            // var expirationMicroseconds = DateTime.UtcNow.AddMicroseconds(double.Parse(expiracao));

            // Adiciona a quantidade de ticks especificada à data e hora atual
            //var expirationTicks = DateTime.UtcNow.AddTicks((long)double.Parse(expiracao));
            #endregion

            // Adiciona a quantidade de minutos especificada à data e hora atual
            var expiration = DateTime.UtcNow.AddMinutes(20);

            //Classe que representa um token JWT e gera o token
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: expiration,
                signingCredentials: credenciais);

            //var user =  _userManager.FindByEmailAsync(userInfoModel.Email);//TODO: Verifica como converter os dasdos Task
            //var roles = _userManager.GetRolesAsync(user);

            var userToken = new UserToken()
            {
                Authenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration,
                Message = "Token JWT OK",
                //AccessProfile = "Admin",
            };

            return userToken;
        }
    }
}
