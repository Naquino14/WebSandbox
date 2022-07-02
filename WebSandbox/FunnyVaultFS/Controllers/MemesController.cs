using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLHelpers;
using ADIS;

namespace FunnyVaultFS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemesController : ControllerBase
    {
        private readonly IConfiguration configuration;

        public MemesController(IConfiguration configuration) => this.configuration = configuration;

        [HttpGet]
        public JsonResult Get()
        {
            return new JsonResult(null);
        }
    }
}
