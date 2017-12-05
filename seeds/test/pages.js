
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        {
          id: 'about',
          title: 'About',
          path: '/about',
          linkText: 'About',
          content: `<p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut posuere lectus. Morbi iaculis pellentesque auctor. Quisque laoreet imperdiet congue. Curabitur vestibulum feugiat cursus. Praesent eget iaculis nunc, ut pulvinar felis. Donec faucibus elementum
                sapien non egestas. Mauris ultrices auctor lacus quis auctor.
              </p>
              <p>
                Mauris sed dui tortor. Aliquam faucibus interdum nulla, et hendrerit nisl pulvinar sit amet. Maecenas a metus sapien. Mauris eget nulla vulputate, porttitor erat vitae, sagittis dolor. Vestibulum tincidunt nunc sed nunc dapibus ullamcorper. Nunc et mattis
                sapien. Nam maximus metus nec odio feugiat ultrices. Nullam a ex erat. Maecenas imperdiet tellus massa, sed luctus quam consequat eu. Mauris vulputate nisi ac congue blandit. Nam eu congue erat. Etiam varius interdum felis venenatis mattis.
                Maecenas neque turpis, dapibus in facilisis sit amet, iaculis eu nulla.
              </p>
              <p>
                Sed vulputate sapien ligula, egestas tristique ipsum venenatis eu. Donec leo augue, auctor vitae arcu hendrerit, volutpat condimentum felis. Nullam blandit malesuada mauris sit amet sagittis. Praesent mollis tincidunt ultrices. Nunc nisl risus, euismod
                pretium vestibulum euismod, gravida nec lectus. Vivamus ut velit nibh. Donec ac elit eu mi eleifend cursus. Nam at rutrum massa. Nunc in mauris tincidunt, ultricies ligula quis, rutrum diam. Praesent feugiat, nunc a commodo bibendum, tellus
                tellus auctor tortor, vitae mollis sem magna ac sapien. Praesent imperdiet lectus sit amet libero tempus, vel porttitor arcu faucibus. Vestibulum ac augue eget urna tristique fringilla. Phasellus at lectus varius, aliquam neque et, laoreet
                quam. Nunc non dolor sed arcu pharetra posuere at vitae felis.
              </p>
              <p>
                Phasellus sed laoreet est. Nunc semper, nibh eget luctus cursus, libero orci venenatis ipsum, at accumsan nisi mauris eu nisl. Etiam eget augue a felis interdum placerat. Etiam sed magna ac magna elementum fringilla venenatis ornare velit. Nulla eu tortor
                in urna pulvinar pretium quis et tellus. Donec quis facilisis leo. Cras mollis dictum fringilla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed sed mi ut dolor sodales convallis. Quisque maximus bibendum porttitor. In sed
                libero tempus, pharetra nunc in, vehicula felis. Pellentesque in neque sed neque pharetra ultricies. Donec scelerisque ipsum eu leo vehicula, nec facilisis sem laoreet. Nunc aliquam vitae sapien vitae aliquam. Cras a eros rutrum, elementum
                nulla at, dictum elit. Integer in quam vitae dolor gravida interdum.
              </p>`}
      ]);
    });
};
