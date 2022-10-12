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
builder.Services.AddSwaggerGen();
builder.AddJwtAuth();

builder.Services.AddDbContext<DataContext>(opt =>
    opt.UseInMemoryDatabase("KompaerjonContext"));

builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<ComparisonService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    SeedDemoData(app);
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


static void SeedDemoData(WebApplication app)
{
    var scope = app.Services.CreateScope();
    var dataContext = scope.ServiceProvider.GetService<DataContext>();
    new KompaerjonBackend.Business.Processes.SeedDemoData(dataContext).Start();
}