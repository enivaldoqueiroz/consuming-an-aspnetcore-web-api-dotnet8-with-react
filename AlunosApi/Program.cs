using AlunosApi.Context;
using AlunosApi.Sevices;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddCors();//Adi��o do servi�o CORS
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

app.UseAuthorization();

app.MapControllers();

app.Run();
