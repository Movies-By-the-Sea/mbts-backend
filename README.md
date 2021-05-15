# Backend API for MBtS Site

_Designed By : Saumya Bhatt_

## Database Schema

_Database Type : *NoSQL*_

_Serverless Database : FirebaseDB_

_Cloud Storage : Firestore_

_Link : [Database Schema](https://dbdiagram.io/d/609fc8c5b29a09603d14fc64)_

Two tables used. One containing information about film and another about short films. Their details can be found out in the above link or from below

The *id*'s are primary keys and will be auto-incremented. Posters would be stored in Firestore whose corresponding link would be stored as links under *img_blob* 

<table>
<tr><th>Movies Table</th><th>shortFilms Table</th></tr>
<tr><td>

| Key | Type |
|:----|-----:|
|  id | int  |
| name | varchar |
| review | varchar |
| director | varchar |
| actor | varchar |
| year | int |
| amazon | boolean |
| netflix | boolean |
| instagram | boolean |
| acting | float |
| story | float |
| execution | float |
| profundity | float |
| overall | float |
| poster | img_blob |
| trailer | varchar |

</td><td>

| Key | Type |
|:----|-----:|
|  id | int  |
| name | varchar |
| review | varchar |
| runningTime | timestamp |
| brief | varchar |
| instagram | boolean |
| poster | img_blob |
| link | varchar |

</td></tr> </table>
