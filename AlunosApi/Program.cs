using AlunosApi.Context;
using AlunosApi.Services;
using AlunosApi.Sevices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

#region Configura��o do Contexto do banco
string connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(connectionString));
#endregion

#region Servi�os
builder.Services.AddScoped<IAlunoService, AlunoService>();
builder.Services.AddScoped<IAuthenticateService, AuthenticateService>();

builder.Services.AddCors();//Adi��o do servi�o CORS

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
#endregion

#region Servi�o do Token JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Issuer"],
            IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:key"])),
            //ClockSkew = TimeSpan.Zero
        };
    });
#endregion

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//Configura��o do servi�o CORS
app.UseCors(options =>
{
    // Permite solicita��es provenientes do origin especificado (neste caso, http://localhost:3000)
    options.WithOrigins("http://localhost:3000");

    // Permite qualquer m�todo HTTP (GET, POST, PUT, DELETE, etc.)
    options.AllowAnyMethod();

    // Permite qualquer cabe�alho na solicita��o
    options.AllowAnyHeader();
});

app.UseHttpsRedirection();

//Middleware de roteamento
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
