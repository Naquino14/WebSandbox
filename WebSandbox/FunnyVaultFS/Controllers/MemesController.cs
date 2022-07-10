using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLHelpers;
using System.Data;
using System.Data.SqlClient;
using FunnyVaultFS.Models;

namespace FunnyVaultFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemesController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public MemesController(IConfiguration configuration) => this.configuration = configuration;

        [HttpGet]
        public JsonResult Get() => 
            new JsonResult(
                TableInteractor.Fetch(
                    new QueryBuilder("dbo.Meme")
                    .Select()
                    .AddSelectColumn("FunnyID")
                    .AddSelectColumn("FunnyName")
                    .From(), 
                    configuration.GetConnectionString("MemeAppCon")
            ));

        [HttpPost]
        public JsonResult Post(Meme meme)
        {
            if (meme.Name is null || meme.Name == "")
                return new($"POST Failed. Property Meme.Name is null or empty. {meme:f}");

            var query = new QueryBuilder("dbo.Meme")
                .InsertIntoCol().AddInsertColumn("FunnyName")
                .AddInsertValue(meme.Name);

            int ra = TableInteractor.Execute(query, configuration.GetConnectionString("MemeAppCon"));

            return new($"POST Success, {ra} rows affected.");
        }

        [HttpPut]
        public JsonResult PUT(Meme meme)
        {
            if (meme.Name is null || meme.Name == "")
                return new($"PUT Failed. Property Meme.Name is null or empty. {meme:f}");

            return new($"PUT Success, {0} rows affected.");
        }
    }
}
