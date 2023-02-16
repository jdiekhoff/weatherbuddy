using Microsoft.Extensions.Options;
using WeatherBuddy.Api.Configuration;

namespace WeatherBuddy.Api.Services
{
  public class BingWeatherMapService : IWeatherService
  {
    private readonly HttpClient client;
    private readonly BingWeatherMapConfiguration bingConfig;

    public BingWeatherMapService(HttpClient client, IOptions<BingWeatherMapConfiguration> bingWeatherMapConfiguration)
    {
      this.client = client;
      this.bingConfig = bingWeatherMapConfiguration.Value;
    }

    public string GetGeocodeForZip(string zipcode, string countrycode)
    {
      // STUB
      // TODO: Use httpclient to generate a http call to Bing Weather API and return response
      this.client.GetAsync("")
      throw new NotImplementedException();
    }
  }
}
