namespace WeatherBuddy.Api.Services
{
  public interface IWeatherService
  {
    string GetGeocodeForZip(string zipcode, string countrycode);
  }
}
