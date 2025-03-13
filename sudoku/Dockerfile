# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy the project file (csproj) and restore dependencies
COPY ./SudokuApp/*.csproj ./
RUN dotnet restore

# Copy the entire source and build the application
COPY ./SudokuApp ./
RUN dotnet publish -c Release -o /out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app

# Copy built files from the previous stage
COPY --from=build /out ./

# Expose port and set the entrypoint
# ENV ASPNETCORE_URLS=http://+:5099 // would set port to 5099
EXPOSE 8080
ENTRYPOINT ["dotnet", "SudokuApp.dll"] 
# alternatively use ' CMD ["dotnet", "SudokuApp.dll"] '