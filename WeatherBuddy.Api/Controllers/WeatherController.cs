using AspNetCore.Proxy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WeatherBuddy.Api.Configuration;

namespace WeatherBuddy.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherController : ControllerBase
    {
        private readonly OpenWeatherMapConfiguration _owmApiConfig;

        public WeatherController(IOptions<OpenWeatherMapConfiguration> owmApiConfig)
        {
            _owmApiConfig = owmApiConfig.Value;
        }

        [Route("{**catchall}")]
        [HttpGet]
        [HttpDelete]
        [HttpPut]
        [HttpPost]
        public Task ProxyCatchall(string catchall)
        {
            var queryString = this.Request.QueryString.Value;
            return this.HttpProxyAsync($"http://api.openweathermap.org/{catchall}{queryString}&appid={_owmApiConfig.ApiKey}");
        }
    }
}
