<div class="ytabs">
  <?php print render($tabs); ?>
</div>
<div class="header-outer">

<div class="container">
<header class="header" id="header" role="banner">

  <div class="logo-search">

    <div class="link-t-search mobile"><a href="/node/5"><img src="http://slot1.dummysite.eu/sites/default/files/location-pin.svg" alt="" class="location-pin" /><a/></div>
      <?php if ($logo): ?>
        <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="header__logo" id="logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" class="header__logo-image" /></a>
      <?php endif; ?>
      <div class="link-t-search desktop">
        <a href="/node/5" class="search-link">
          <span><?php print t('ZOEK EEN WARME BAKKER'); ?></span>
          <a/>
        </div>
        <div class="top-mobile-menu">
          <?php print render($page['mobilemenu']); ?>
        </div>

      </div>

      <?php print render($page['header']); ?>

    </header>
    </div>
  </div>
<div id="page" class="container">


  <div role="navigation" class="container">
    <?php print render($page['navigation']); ?>
  </div>

<?php print render($page['headerbottom']); ?>

  <div id="main">

    <div id="content" class="column" role="main">
      <?php print render($page['highlighted']); ?>
      <?php print $breadcrumb; ?>
      <a id="main-content"></a>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1 class="page__title title" id="page-title"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
      <?php print $messages; ?>

      <?php print render($page['help']); ?>
      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
      <?php print render($page['content']); ?>

    </div>

  </div>

</div>
<div class="outer-container">
  <div class="container-narrow">
    <div class="scroll-to-top">
      <div class="arrow-top-outer">
        <div class="arrow-top">

        </div>
      </div>

      <div class="top-button">
        <a class="top animate-anchor" href="#header"><?php print t('top'); ?></a>
      </div>
    </div>
    <div class="zigzag"></div>
      <?php print render($page['footer']); ?>
  </div>

</div>
<?php print render($page['bottom']); ?>