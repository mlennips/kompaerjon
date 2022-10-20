using System;
using KompaerjonBackend.Business.Models;
using KompaerjonBackend.Business.Services;
using KompaerjonBackend.Infrastructure.Auth;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwagger();
builder.Services.AddJwtAuth(builder.Configuration);

builder.Services.AddDbContext<DataContext>(opt =>
    opt.UseInMemoryDatabase("KompaerjonContext"));
builder.Services.AddCors();

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ComparisonService>();
builder.Services.AddScoped<ComparisonAnalysisService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    SeedDemoData(app);
}

app.UseCors(x => x
     .AllowAnyMethod()
     .AllowAnyHeader()
     .SetIsOriginAllowed(origin => true) // allow any origin
     .AllowCredentials()); // allow credentials

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


static void SeedDemoData(WebApplication app)
{
    var scope = app.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    new KompaerjonBackend.Business.Processes.SeedDemoData(dataContext).Start();
}