using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(pb => pb.AddPolicy("AllowOrigin", o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));
builder.Services.AddControllersWithViews()
    .AddNewtonsoftJson(o => o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
    .AddNewtonsoftJson(o => o.SerializerSettings.ContractResolver = new DefaultContractResolver());

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors(pb => pb.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
