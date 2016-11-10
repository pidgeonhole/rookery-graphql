# rookery-graphql

## Example queries

### CURL
```
curl -X POST -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
	"query": "{ categories { name description problems { id title description } } }"
}' "http://localhost:4000/graphql"
```