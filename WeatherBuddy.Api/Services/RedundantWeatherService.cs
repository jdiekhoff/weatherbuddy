namespace WeatherBuddy.Api.Services
{
  public class RedundantWeatherService : IWeatherService
  {
    private readonly IList<IWeatherService> weatherServices;

    public RedundantWeatherService(BingWeatherMapService bingWeatherMapService, OpenWeatherMapService openWeatherMapService)
    {
      this.weatherServices = new List<IWeatherService>();

      this.weatherServices.Add(bingWeatherMapService);
      this.weatherServices.Add(openWeatherMapService);
    }

    public string GetGeocodeForZip(string zipcode, string countrycode)
    {
      foreach(var weatherService in weatherServices)
      {
        try
        {
          return openWeatherMapService.GetGeocodeForZip(zipcode, countrycode);
        }
        catch (HttpRequestException e)
        {
          if(e.StatusCode == System.Net.HttpStatusCode.ServiceUnavailable)
          {
            return bingWeatherMapService.GetGeocodeForZip(zipcode, countrycode);
          }
        }
      }

    }
  }
}
