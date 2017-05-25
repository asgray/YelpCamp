var mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

var data = [
    { name: "Dolly Sods",
    image: "http://33bopn2vwq9l20z09k1ikaal.wpengine.netdna-cdn.com/wp-content/uploads/2012/12/IMG_0017.jpg",
    description: "More like Dolly Sogs, eh? We have a wide range of facilities including those you would expect from an high quality camp site – electric hook ups, shower and toilet block and laundry room. We also have a recreation block which is home to a games room with pool table, TV room and 10m swimming pool.  Situated next to the recreation block are two outdoor tennis courts."
    },
    
    { name: "Shennandoah NP",
    image: "http://blog.columbia.com/wp-content/uploads/2016/09/Shenandoah-National-Park.jpg",
    description: "Full of friendly bears. We have a wide range of facilities including those you would expect from an high quality camp site – electric hook ups, shower and toilet block and laundry room. We also have a recreation block which is home to a games room with pool table, TV room and 10m swimming pool.  Situated next to the recreation block are two outdoor tennis courts."
    },
    
    { name: "Catskills",
    image: "http://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/catskills-catskills0416.jpg?itok=LKbX7kgk",
    description: "Rip Van Winkleville. We have a wide range of facilities including those you would expect from an high quality camp site – electric hook ups, shower and toilet block and laundry room. We also have a recreation block which is home to a games room with pool table, TV room and 10m swimming pool.  Situated next to the recreation block are two outdoor tennis courts."
    },
   
    { name: "Acadia NP",
    image: "http://www.acadiamagic.com/1200px/otter-cliff-10.jpg",
    description: "Empty in January. We have a wide range of facilities including those you would expect from an high quality camp site – electric hook ups, shower and toilet block and laundry room. We also have a recreation block which is home to a games room with pool table, TV room and 10m swimming pool.  Situated next to the recreation block are two outdoor tennis courts."
    },
    
    { name: "Grayson Highlands",
    image: "http://www.dcr.virginia.gov/state-parks/image/data/gh-image-01.jpg",
    description: "Pony Pony Pony Pony Pony Pony Pony Pony Pony Pony Pony Pony. We have a wide range of facilities including those you would expect from an high quality camp site – electric hook ups, shower and toilet block and laundry room. We also have a recreation block which is home to a games room with pool table, TV room and 10m swimming pool.  Situated next to the recreation block are two outdoor tennis courts."
    }
];

function seedDB(){
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        } else {
          console.log("database cleared");
        }
        // console.log("removed campgrounds");
    //     data.forEach(function(seed){
    //       Campground.create(seed, function(err, campground){
    //           if (err){
    //               console.log(err);
    //           }else{
    //               console.log("added campground");
    //               Comment.create(
    //                 {
    //                     text: "This place is great but I wish there was internet",
    //                     author: "Homer"
    //                 }, function(err, comment) {
    //                   if (err){
    //                       console.log(err);
    //                   }else {
    //                     campground.comments.push(comment);
    //                     campground.save();
    //                     console.log("created new comment");
    //                   }
    //               });
    //           }
    //       }); 
    //     });
    });
};

module.exports = seedDB;